import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Employee } from "src/employees/employees.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Department {
    @PrimaryGeneratedColumn("uuid")
    @ApiProperty({
        type: String,
        description: "Database id of the department",
    })
    id: string;

    @Column()
    @ApiProperty({
        type: String,
        description: "Name of the department",
        example: "IT",
    })
    name: string;

    @Column()
    @ApiProperty({
        type: String,
        description: "Short description of the department",
        example: "Information technology department",
    })
    description: string;

    @Column({
        name: "is_active"
    })
    @ApiProperty({
        type: Boolean,
        description: "Present status of the activity of the department",
        example: true,
    })
    isActive: boolean;

    @Column()
    @ApiProperty({
        type: String,
        description: "Location of the office of the department",
        example: "The Hague",
    })
    officeLocation: string;

    @Column()
    @ApiProperty({
        type: Number,
        description: "Approved budget of the department",
        example: "1000000"
    })
    budget: number;

    @OneToMany(() => Employee, (employee) => employee.department)
    @ApiPropertyOptional({
        type: [Employee],
    })
    employees: Employee[];


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