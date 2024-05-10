import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiOkResponse, ApiBody, ApiCreatedResponse, ApiParam, ApiResponse } from '@nestjs/swagger';
import { DepartmentsService } from './departments.service';
import { Department } from './departments.entity';
import { DepartmentCreateDto } from './dtos/department-create.dto';
import { DepartmentUpdateDto } from './dtos/department-update.dto';
import { DepartmentQueryDto } from './dtos/department-query.dto';

@ApiTags("Departments")
@Controller('departments')
export class DepartmentsController {
    constructor(private departmentsService: DepartmentsService) {}

    @Get("/")
    @ApiOperation({
        summary: "Retrieve all departments",
    })
    @ApiOkResponse({
        type: [Department],
        description: "All departments listed successfully",
    })
    getAll(@Query() queries: DepartmentQueryDto): Promise<Department[]> {
        return this.departmentsService.getAll(queries);
    }

    @Post("/")
    @ApiOperation({
        summary: "Create a department",
    })
    @ApiBody({
        type: DepartmentCreateDto,
    })
    @ApiCreatedResponse({
        type: Department,
        description: "Department created successfully",
    })
    createDepartment(@Body() department: DepartmentCreateDto ): Promise<Department>{
        return this.departmentsService.createDepartment(department);
    }

    @Put("/:id")
    @ApiOperation({
        summary: "Update a department",
    })
    @ApiBody({
        type: DepartmentUpdateDto,
    })
    @ApiParam({
        type: String,
        name: "id"
    })
    @ApiOkResponse({
        type: Department,
        description: "Department updated successfully",
    })
    updateDepartment(@Param("id") id: string, @Body() updateBody: DepartmentUpdateDto): Promise<Department>{
        return this.departmentsService.updateDepartment(id, updateBody);
    }

    @Delete("/:id")
    @ApiOperation({
        summary: "Delete one department",
    })
    @ApiParam({
        type: String,
        name: "id",
    })
    @ApiResponse({
        status: 204,
        description: "Song deleted",
    })
    deleteDepartment(@Param("id") id: string): Promise<void>{
        return this.departmentsService.deleteDepartment(id)
        
    }
}
