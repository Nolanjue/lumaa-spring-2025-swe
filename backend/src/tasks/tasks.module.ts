import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { PrismaService } from 'prisma/prisma.service';
import { TaskGuard } from './task.guard';
import { AuthModule } from 'src/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
@Module({
    imports:  [JwtModule.register({
          secret: process.env.JWT_SECRET,
          signOptions: { expiresIn: '1h' },
        }),],
    controllers: [TasksController],
    providers: [TasksService, PrismaService, TaskGuard],
})
export class TasksModule { }