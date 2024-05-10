import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsDateString, IsEmail, IsEnum, IsNotEmpty, IsNumber, IsPhoneNumber, IsString, IsUUID } from "class-validator";
import { PayType } from "src/common/pay-type.enum";

export class EmployeeCreateDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        type: String,
        example: "John Doe",
        description: "Employee name",
    })
    name: string;

    @IsEmail()
    @IsNotEmpty()
    @ApiProperty({
        type: String,
        example: "john.doe@examlple.com",
        description: "Email of the employee",
    })
    email: string;

    @IsPhoneNumber()
    @IsNotEmpty()
    @ApiProperty({
        type: String,
        description: "Phone number of the employee",
        example: "+40712345678"
    })
    phone: string;

    @IsDateString()
    @IsNotEmpty()
    @ApiProperty({
        type: Date,
        description: "Hiring date of the employee",
        example: "2002-01-01 00:00:00",
    })
    hireDate: Date;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        type: String,
        description: "Job title of the employee",
        example: "Software developer"
    })
    jobTitle: string;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({
        type: Number,
        description: "Pay rate of the employee, based on the selected type",
        example: "1000"
    })
    payRate: number;

    @IsEnum(PayType)
    @ApiProperty({
        description: "Type of the pay of the employee",
        enum: PayType,
        example: PayType.HOURLY,
    })
    payType: PayType;

    @IsBoolean()
    @ApiProperty({
        type: Boolean,
        description: "Present status of the employee in the company",
        example: true,
    })
    isActive: boolean;

    @IsUUID()
    @IsNotEmpty()
    @ApiProperty({
        type: String,
        description: "Database id of the department",
    })
    departmentId: string;

    
}