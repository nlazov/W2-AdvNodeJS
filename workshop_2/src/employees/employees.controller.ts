import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { EmployeesService } from './employees.service';
import { Employee } from './employees.entity';
import { EmployeeCreateDto } from './dtos/employee-create.dto';
import { EmployeeUpdateDto } from './dtos/employee-update.dto';
import { EmployeeQueryDto } from './dtos/employee-query.dto';

@ApiTags("Employees")
@Controller('employees')
export class EmployeesController {
    constructor(private employeesService: EmployeesService){}

    @Get("/")
    @ApiOperation({
        summary: "Retrieve all employees",
    })
    @ApiOkResponse({
        type: [Employee],
        description: "All employees listed successfully",
    })
    getAll(@Query() queries: EmployeeQueryDto): Promise<Employee[]> {
        return this.employeesService.getAll(queries);
    }

    @Post("/")
    @ApiOperation({
        summary: "Create an employee",
    })
    @ApiBody({
        type: EmployeeCreateDto,

    })
    @ApiCreatedResponse({
        type: Employee,
        description: "Employee created successfully",
    })
    createEmployee(@Body() employee: EmployeeCreateDto){
        return this.employeesService.createEmployee(employee);
    }

    @Put("/:id")
    @ApiOperation({
        summary: "Update an employee",
    })
    @ApiBody({
        type: EmployeeUpdateDto
    })
    @ApiParam({
        type: String,
        name: "id"
    })
    @ApiOkResponse({
        type: Employee,
        description: "Employee updated successfully",
    })
    updateEmployee(@Param("id") id: string, @Body() updateBody: EmployeeUpdateDto): Promise<Employee>{
        return this.employeesService.updateEmployee(id, updateBody);
    }

    @Delete("/:id")
    @ApiOperation({
        summary: "Delete one employee",
    })
    @ApiParam({
        type: String,
        name: "id",
    })
    @ApiResponse({
        status: 204,
        description: "Song deleted",
    })
    deleteEmployee(@Param("id") id: string): Promise<void>{
        return this.employeesService.deleteEmployee(id)
    }
}
