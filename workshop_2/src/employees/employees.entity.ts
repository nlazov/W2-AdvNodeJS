import { ApiProperty } from "@nestjs/swagger";
import { PayType } from "src/common/pay-type.enum";
import { Department } from "src/departments/departments.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Employee {

    @PrimaryGeneratedColumn("uuid")
    @ApiProperty({
        type: String,
        description: "Database id of the employee",
    })
    id: string;

    @Column()
    @ApiProperty({
        type: String,
        description: "Name of the employee",
        example: "John Doe"
    })
    name: string;

    @Column()
    @ApiProperty({
        type: String,
        description: "Email of the employee",
        example: "john.doe@example.com"
    })
    email: string;

    @Column()
    @ApiProperty({
        type: String,
        description: "Phone number of the employee",
        example: "+40712345678"
    })
    phone: string;

    @Column({
        name: "hire_date",
    })
    @ApiProperty({
        type: Date,
        description: "Date of hiring the employee",
        example: "2024-05-07T08:10:25.116Z"
    })
    hireDate: Date;

    @Column({
        name: "job_title",
    })
    @ApiProperty({
        type: String,
        description: "Job title of the employee",
        example: "Software developer"
    })
    jobTitle: string;

    @Column({
        name: "pay_rate",
    })
    @ApiProperty({
        type: Number,
        description: "Pay rate of the employee, based on the selected type",
        example: "1000"
    })
    payRate: number;

    @Column({
        name: "pay_type",
        enum: PayType,
        enumName: "pay-type"
    })
    @ApiProperty({
        description: "Type of the pay of the employee",
        enum: PayType,
        example: PayType.HOURLY,
    })
    payType: PayType;

    @Column({
        name: "is_active"
    })
    @ApiProperty({
        type: Boolean,
        description: "Present status of the employee in the company",
        example: true,
    })
    isActive: boolean;

    @ManyToOne(() => Department, (department) => department.employees)
    @JoinColumn({   
        name: "department_id",
    })
    @ApiProperty({
        type: Department,
    })
    department: Department;

    @Column({
        name: "department_id"
    })
    @ApiProperty({
        type: String,
        description: "Database id of the department",
    })
    departmentId: string;
    
    @CreateDateColumn({
        name: "created_at"
    })
    @ApiProperty({
        type: Date,
        example: "2024-04-21 11:13:15.61689",
    })
    createdAt: Date;

    @UpdateDateColumn({
        name: "updated_at"
    })
    @ApiProperty({
        type: Date,
        example: "2024-04-21 11:13:15.61689",
    })
    updatedAt: Date;

    @DeleteDateColumn({
        name: "deleted_at"
    })
    @ApiProperty({
        type: Date,
        example: "2024-04-21 11:13:15.61689",
        nullable: true,
    })
    deletedAt: Date;

}