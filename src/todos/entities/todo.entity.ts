import { User } from "src/users/entities/user.entity";
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";

@Entity()
export class Todo {
    @PrimaryGeneratedColumn({
        type: "int"
    })
    id: number;

    @Column({
        type: "varchar"
    })
    title: string;

    @Column({
        default: false,
    })
    completed: boolean;

    @Column({
        type: "int"
    })
    userId: number;

    @ManyToOne(() => User, user =>  user.todos, {onDelete: 'CASCADE', onUpdate: "CASCADE", nullable: false, eager: true})
    user: User;
}