import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { DbModule } from './db/db.module';
import { EmployeesModule } from './employees/employees.module';

@Module({
  imports: [UsersModule, DbModule, EmployeesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
