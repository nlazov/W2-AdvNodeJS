import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from './employees.entity';
import { Between, FindOptionsWhere, ILike, LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import { EmployeeCreateDto } from './dtos/employee-create.dto';
import { EmployeeUpdateDto } from './dtos/employee-update.dto';
import { EmployeeQueryDto } from './dtos/employee-query.dto';

@Injectable()
export class EmployeesService {
    constructor(@InjectRepository(Employee) private employeesRepository: Repository<Employee>){}

    getAll({jobTitle, isActive, payType, minPay, maxPay}: EmployeeQueryDto): Promise<Employee[]> {
        let whereQuery = {} satisfies FindOptionsWhere<Employee>


        jobTitle? whereQuery = {...whereQuery, jobTitle: ILike(`%${jobTitle}%`)} : {};
        typeof isActive === 'boolean'? whereQuery = {...whereQuery, isActive} : {};
        payType? whereQuery = {...whereQuery, payType} : {};
        if (minPay && maxPay) {
            whereQuery = {
              ...whereQuery,
              payRate: Between(minPay, maxPay),
            };
          } else if (maxPay) {
            whereQuery = {
              ...whereQuery,
              payRate: MoreThanOrEqual(maxPay),
            };
          } else if (minPay) {
            whereQuery = {
              ...whereQuery,
              payRate: LessThanOrEqual(minPay),
            };
          }

          console.log(whereQuery)
        return this.employeesRepository.find({
            relations: ["department"],
            where: whereQuery,
        })
    }

    createEmployee(employee: EmployeeCreateDto): Promise<Employee> {
        const newEmployee = this.employeesRepository.create(employee);

        return this.employeesRepository.save(newEmployee);
    }

    async updateEmployee(id: string, updateBody: EmployeeUpdateDto): Promise<Employee> {
        const employee = await this.employeesRepository.findOneBy({id});
        if (!employee) throw new NotFoundException("No employee with this id");
        const updatedEmployee = this.employeesRepository.merge(employee, updateBody);

        return this.employeesRepository.save(updatedEmployee);
    }

    async deleteEmployee(id: string): Promise<void> {
        const employee = await this.employeesRepository.findOneBy({id});
        if (!employee) throw new NotFoundException("No employee with this id");

        employee.isActive = false;
        await this.employeesRepository.save(employee)
        await this.employeesRepository.softDelete(id);
    }
}
