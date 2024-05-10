import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsDateString, IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsPhoneNumber, IsString, IsUUID } from "class-validator";
import { PayType } from "src/common/pay-type.enum";

export class EmployeeUpdateDto {
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        type: String,
        example: "John Doe",
        description: "Employee name",
    })
    name?: string;

    @IsOptional()
    @IsEmail()
    @IsNotEmpty()
    @ApiProperty({
        type: String,
        example: "john.doe@examlple.com",
        description: "Email of the employee",
    })
    email?: string;

    @IsOptional()
    @IsPhoneNumber()
    @IsNotEmpty()
    @ApiProperty({
        type: String,
        description: "Phone number of the employee",
        example: "+40712345678"
    })
    phone?: string;

    @IsOptional()
    @IsDateString()
    @IsNotEmpty()
    @ApiProperty({
        type: Date,
        description: "Hiring date of the employee",
        example: "2002-01-01 00:00:00",
    })
    hireDate?: Date;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        type: String,
        description: "Job title of the employee",
        example: "Software developer"
    })
    jobTitle?: string;

    @IsOptional()
    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({
        type: Number,
        description: "Pay rate of the employee, based on the selected type",
        example: "1000"
    })
    payRate?: number;

    @IsOptional()
    @IsEnum(PayType)
    @ApiProperty({
        description: "Type of the pay of the employee",
        enum: PayType,
        example: PayType.HOURLY,
    })
    payType?: PayType;

    @IsOptional()
    @IsBoolean()
    @ApiProperty({
        type: Boolean,
        description: "Present status of the employee in the company",
        example: true,
    })
    isActive?: true | false;

    @IsOptional()
    @IsUUID()
    @IsNotEmpty()
    @ApiProperty({
        type: String,
        description: "Database id of the department",
    })
    departmentId?: string;
}