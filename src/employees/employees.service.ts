import { Injectable } from '@nestjs/common';
import { Prisma, Role } from 'generated/prisma';
import { DbService } from 'src/db/db.service';

@Injectable()
export class EmployeesService {
  constructor(private readonly db: DbService) {}

  async create(createEmployeeDto: Prisma.EmployeeCreateInput) {
    return this.db.employee.create({
      data: createEmployeeDto,
    });
  }

  async findAll(role?: Role) {
    return this.db.employee.findMany({
      where: { role },
    });
  }

  async findOne(id: number) {
    return this.db.employee.findUnique({
      where: { id },
    });
  }

  async update(id: number, updateEmployeeDto: Prisma.EmployeeUpdateInput) {
    return this.db.employee.update({
      where: { id },
      data: updateEmployeeDto,
    });
  }

  async remove(id: number) {
    return this.db.employee.delete({
      where: { id },
    });
  }
}
