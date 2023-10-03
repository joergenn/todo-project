import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import * as Joi from 'joi';
import { DataSource, DataSourceOptions } from "typeorm";

console.log(process.env)

const schema = Joi.object({
    DB_PORT: Joi.number().required(),
    DB_USER: Joi.string().required(),
    DB_PASSWORD: Joi.string().required(),
    DB_NAME: Joi.string().required(),
    DB_HOST: Joi.string().required()
})

const {value, error} = schema.validate({
    DB_PORT: process.env.DB_PORT,
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_NAME: process.env.DB_NAME,
    DB_HOST: process.env.DB_HOST
});

if(error){
    throw new Error("Config validation failed")
}

export const configuration: DataSourceOptions = {
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    type: "mysql",
    entities: ['./dist/**/*.entity.js'],
    migrations: ['./dist/db/migrations/*.js']
};

// export const configuration2: DataSourceOptions = {
//     type: 'mysql',
//     host: 'localhost',
//     port: 3306,
//     username: 'root',
//     password: '8888',
//     database: 'todo',
//     entities: ['./dist/**/*.entity.js'],
//     synchronize: false,
//     migrations: ['./dist/db/migrations/*.js']
// };

const dataSource = new DataSource(configuration);
export default dataSource;