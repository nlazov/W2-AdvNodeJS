import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class DepartmentCreateDto {
    
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        type: String,
        example: "IT",
        description: "Department name",
    })
    name: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        type: String,
        description: "Short description of the department",
        example: "Information technology department",
    })
    description: string;

    @IsBoolean()
    @IsNotEmpty()
    @ApiProperty({
        type: Boolean,
        description: "Present status of the activity of the department",
        example: true,
    })
    isActive: boolean;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        type: String,
        description: "Location of the office of the department",
        example: "The Hague",
    })
    officeLocation: string;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({
        type: Number,
        description: "Approved budget of the department",
        example: "1000000"
    })
    budget: number;
}