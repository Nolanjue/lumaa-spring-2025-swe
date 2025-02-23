import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TaskGuard extends AuthGuard('jwt') {
  constructor(private jwtService: JwtService) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    console.log("request here", request)
    const token = request.cookies['access_token'];
   console.log('success in guarding', token)


  
    if (!token) {
      throw new UnauthorizedException('No token provided');
    }

    try {
        //sucess here leads to going into the controllers
      const payload = this.jwtService.verify(token);
      // Add user info to request object
      console.log(payload, "payload")
      request.user = payload;//attach to req.user here
      console.log(request.user)
      return true;


    } catch (error){
        console.log(error)
      throw new UnauthorizedException('Invalid token',error)
    }
  }
}