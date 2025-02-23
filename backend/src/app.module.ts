import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true, 
    envFilePath: '.env', 
  }),
    TasksModule, AuthModule], //this is what is the "use" is in nodeJS, we call the controllers here
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
