import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Department } from './departments.entity';
import { FindOptionsWhere, ILike, MoreThanOrEqual, Repository } from 'typeorm';
import { DepartmentCreateDto } from './dtos/department-create.dto';
import { DepartmentUpdateDto } from './dtos/department-update.dto';
import { DepartmentQueryDto } from './dtos/department-query.dto';

@Injectable()
export class DepartmentsService {
    constructor(@InjectRepository(Department) private departmentsRepository: Repository<Department>){}

    getAll({name, officeLocation, isActive, budget}: DepartmentQueryDto): Promise<Department[]> {
        let whereQuery = {} satisfies FindOptionsWhere<Department>

        name? whereQuery = {...whereQuery, name: ILike(`%${name}%`)} : {};
        officeLocation? whereQuery = {...whereQuery, officeLocation: ILike(`%${officeLocation}%`)} : {};
        typeof isActive === 'boolean'? whereQuery = {...whereQuery, isActive} : {}
        budget? whereQuery = {...whereQuery, budget: MoreThanOrEqual(budget)}: {}

        console.log(whereQuery)
        
        return this.departmentsRepository.find({
            relations: ["employees"],
            where: whereQuery,
        })
    }

    createDepartment(department: DepartmentCreateDto): Promise<Department> {
        const newDepartment = this.departmentsRepository.create(department);
        return this.departmentsRepository.save(newDepartment);
    }

    async updateDepartment(id: string, updateBody: DepartmentUpdateDto): Promise<Department> {
        const department = await this.departmentsRepository.findOneBy({ id });
        if(!department) throw new NotFoundException("No department with this id");
        const updatedDepartment = this.departmentsRepository.merge(department, updateBody);
        return this.departmentsRepository.save(updatedDepartment);
    }

    async deleteDepartment(id: string): Promise<void> {
        const deleteAnswer = await this.departmentsRepository.softDelete(id)
        if(deleteAnswer.affected < 1) throw new NotFoundException("No department with this Id");
    }
}
