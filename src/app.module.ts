import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { DbModule } from './db/db.module';
import { EmployeesModule } from './employees/employees.module';
// https://docs.nestjs.com/security/rate-limiting
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    UsersModule,
    DbModule,
    EmployeesModule,
    ThrottlerModule.forRoot({
      throttlers: [
        {
          name: 'global',
          ttl: 10000,
          limit: 3,
        },
        {
          name: 'more',
          ttl: 10000,
          limit: 10,
        },
      ],
    }),
  ],
  controllers: [AppController],
  providers: [AppService, { provide: APP_GUARD, useClass: ThrottlerGuard }],
})
export class AppModule {}
