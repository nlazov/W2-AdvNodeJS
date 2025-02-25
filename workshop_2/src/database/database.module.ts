import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [TypeOrmModule.forRootAsync({
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory:(configService: ConfigService) => ({
            type: "postgres",
            host: "localhost",
            port: configService.get("DB_PORT"),
            username: configService.get("DB_USERNAME"),
            password: configService.get("DB_PASSWORD"),
            database: configService.get("DB_NAME"),
            entities: [__dirname + "/../**/*.entity{.ts,.js}"],
            synchronize: true,
        })
    })]
})
export class DatabaseModule {}
