import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class DepartmentUpdateDto {
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        type: String,
        example: "IT",
        description: "Department name",
    })
    name?: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        type: String,
        description: "Short description of the department",
        example: "Information technology department",
    })
    description?: string;

    @IsOptional()
    @IsBoolean()
    @IsNotEmpty()
    @ApiProperty({
        type: Boolean,
        description: "Present status of the activity of the department",
        example: true,
    })
    isActive?: boolean;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        type: String,
        description: "Location of the office of the department",
        example: "The Hague",
    })
    officeLocation?: string;

    @IsOptional()
    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({
        type: Number,
        description: "Approved budget of the department",
        example: "1000000"
    })
    budget?: number;
}