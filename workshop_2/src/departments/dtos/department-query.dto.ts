import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Transform, Type } from "class-transformer";
import { IsBoolean, IsInt, IsNumber, IsOptional, IsString } from "class-validator";

export class DepartmentQueryDto {
    @IsString()
    @IsOptional()
    @ApiPropertyOptional({
        type: String,
        description: "Name of the department",
        example: "Operations"
    })
    name?: string;

    @IsString()
    @IsOptional()
    @ApiPropertyOptional({
        type: String,
        description: "Location of the department",
        example: "Amsterdam"
    })
    officeLocation?: string;

    @Transform(({value}) => value === 'true' ? true : value === 'false' ? false : value)
    @IsBoolean()
    @IsOptional()
    @ApiPropertyOptional({
        type: Boolean,
        description: "Present status of the department",
        example: false,
    })
    isActive?: boolean;

    @Type(() => Number)
    @IsNumber()
    @IsOptional()
    @ApiPropertyOptional({
        type: Number,
        description: "Budget of the department",
        example: 10000,
    })
    budget?: number; 
}