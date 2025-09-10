import { Module } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { EmployeesController } from './employees.controller';
import { DbModule } from 'src/db/db.module';

@Module({
  controllers: [EmployeesController],
  providers: [EmployeesService],
  imports: [DbModule],
})
export class EmployeesModule {}
