import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { EmployeesModule } from './employees/employees.module';
import { DepartmentsModule } from './departments/departments.module';

@Module({
  imports: [
    DatabaseModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    EmployeesModule,
    DepartmentsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
