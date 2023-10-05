import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Todo } from "src/todos/entities/todo.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn({
        type: "int"
    })
    id: number;

    @Column({
        type: "varchar",
        unique: true,
    })
    username: string;

    @Column({
        type: "varchar",
        unique: true,
    })
    email: string;

    @Column({
        type: "varchar",
    })
    password: string;

    @Column({
        type: "boolean",
    })
    isAdmin: boolean;

    @OneToMany(() => Todo, todo => todo.user)
    todos: Todo[];
}
