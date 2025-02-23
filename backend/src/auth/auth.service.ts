import { Injectable, UnauthorizedException, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Response } from 'express';



@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService,
    ) { }

    async register(username: string, password: string, res: Response) {
        try {
           
            const user = await this.prisma.user.findUnique({
                where: { username },
            });

            if (user) {
                return { status: 404, error_message: "user already exists" }
            }
            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = await this.prisma.user.create({
                data: {
                    username,
                    password: hashedPassword,
                },
            });
            console.log(newUser)
            
            if (!newUser) {
                return {
                    status: HttpStatus.BAD_REQUEST,
                    error_message: "failed to create user"

                };
            }
            const token = this.jwtService.sign({
                sub: newUser.id,
                username: newUser.username
            })
            console.log(token)


            const cookie = res.cookie('access_token', token, {
                httpOnly: true,
                secure: false,
                sameSite: 'lax',
                maxAge: 24 * 60 * 60 * 1000
            });
            console.log(cookie)

            return {
                status: HttpStatus.CREATED,
                message: 'User registered successfully',
                token: token,
                user: {
                    id: newUser.id,
                    username: newUser.username
                }
            };
        }
        catch (error) {
            if (error instanceof HttpException) {
                console.log(error)
                throw error;

            }
            console.log(error)
            throw new HttpException('Registration failed', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async login(username: string, password: string, res: Response) {
        try {
            const user = await this.prisma.user.findUnique({
                where: { username },
            });

            if (!user) {
                throw new HttpException('no user',  HttpStatus.BAD_REQUEST,); 
            }

            const isValid = await bcrypt.compare(password, user.password);

            if (!isValid) {
                throw new HttpException('incorrect password',  HttpStatus.BAD_REQUEST,); 
            }
            const token = this.jwtService.sign({ sub: user.id, username: user.username });

            const cookie = res.cookie('access_token', token, {
                httpOnly: true,
                secure: false,
                sameSite: 'lax',
                maxAge: 24 * 60 * 60 * 1000
            });

            return {
                status: HttpStatus.OK,
                message: 'Login successful',
                token: token,
                user: {
                    id: user.id,
                    username: user.username
                }
            };
        }
        catch (error) {
            if (error instanceof UnauthorizedException) {
                console.log(error)
                throw error;
            }
            throw new HttpException('Login failed', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async logout(res: Response) {
        try {
            res.clearCookie('access_token', {
                httpOnly: true,
                secure: false, 
                path: '/',
                domain: 'localhost',
              });
            return {
                status: HttpStatus.OK,
                message: 'Logged out successfully'
            };
        } catch (error) {
            if (error instanceof UnauthorizedException) {
                throw error;
            }
            throw new HttpException('logout failure', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}