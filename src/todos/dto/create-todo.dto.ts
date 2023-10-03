import { User } from "src/users/entities/user.entity";
import { ApiProperty } from "@nestjs/swagger";

export class CreateTodoDto {
    @ApiProperty({
        description: "Title of todo"
    })
    title: string;
    userId: User;
}
