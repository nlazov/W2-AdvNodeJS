import { ApiPropertyOptional } from "@nestjs/swagger";
import { Transform, Type } from "class-transformer";
import { IsBoolean, IsEnum, IsInt, IsOptional, IsString } from "class-validator";
import { PayType } from "src/common/pay-type.enum";

export class EmployeeQueryDto {
    @IsString()
    @IsOptional()
    @ApiPropertyOptional({
        type: String,
        description: "Job Title of the employee",
    })
    jobTitle?: string;

    @IsEnum(PayType)
    @IsOptional()
    @ApiPropertyOptional({
        enum: PayType,
        description: "Pay type of the employee",
    })
    payType?: PayType

    @Transform(({value}) => value === 'true' ? true : value === 'false' ? false : value)
    @IsBoolean()
    @IsOptional()
    @ApiPropertyOptional({
        type: Boolean,
        description: "Present status of the employee",
        example: false,
    })
    isActive?: boolean;


    @Transform(({value}) => parseInt(value))
    @IsOptional()
    @IsInt()
    @ApiPropertyOptional({
        type: Number,
        description: "Minimum pay rate of the employee",
    })
    minPay?: number;

    @Transform(({value}) => parseInt(value))
    @IsOptional()
    @IsInt()
    @ApiPropertyOptional({
        type: Number,
        description: "Maximum pay rate of the employee",
    })
    maxPay?: number;

}