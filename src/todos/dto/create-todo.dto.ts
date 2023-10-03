import { User } from "src/users/entities/user.entity";

export class CreateTodoDto {
    title: string;
    userId: User;
}
