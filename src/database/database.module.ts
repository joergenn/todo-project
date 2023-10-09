import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            useFactory: (configService: ConfigService) => ({
                type: 'mysql',
                host: configService.get('DB_HOST'),
                port: configService.get('DB_PORT'),
                database: configService.get('DB_NAME'),
                username: configService.get('DB_USER'),
                password: configService.get('DB_PASSWORD'),
                entities: ['./dist/**/*.entity.js'],
                migrations: ['./dist/db/migrations/*.js'],
                synchronize: false,
            }),
            inject: [ConfigService],
        })
    ]
})
export class DatabaseModule {}
