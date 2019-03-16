import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { EmployerService } from './employer/employer.service';
import { EmployerController } from './employer/employer.controller';
import { EmployerModule } from './employer/employer.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';

@Module({
  imports: [EmployerModule, TypeOrmModule.forRoot()],
  providers: [EmployerService],
  controllers: [EmployerController],
})
export class AppModule implements NestModule {
  constructor(private readonly connection: Connection) {}
  configure(consumer: MiddlewareConsumer) {}
}
