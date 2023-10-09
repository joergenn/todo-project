import { config } from "dotenv";
config();
import { DataSource } from "typeorm";
import { ConfigService} from '@nestjs/config';

const configService = new ConfigService();

export default new DataSource({
    type: 'mysql',
    host: configService.get('DB_HOST'),
    port: configService.get('DB_PORT'),
    database: configService.get('DB_NAME'),
    username: configService.get('DB_USER'),
    password: configService.get('DB_PASSWORD'),
    entities: ['dist/**/*.entity.js'],
    migrations: ['dist/database/migrations/*.js'],
})