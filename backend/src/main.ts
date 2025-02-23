import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.enableCors({
    origin: process.env.FRONTEND_URL, //allow frontend connections to this server
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', 
    credentials: true, // Allow cookies and credentials
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
