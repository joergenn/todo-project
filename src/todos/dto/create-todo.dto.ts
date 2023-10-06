import { User } from "src/users/entities/user.entity";
import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsDefined, IsBoolean, IsOptional } from "class-validator";

export class CreateTodoDto {
    @ApiProperty({
        description: "Title of todo"
    })
    @IsString()
    @IsDefined()
    title: string;

    @ApiProperty({
        description: "Foreign key from user table"
    })
    userId: number;

    @ApiProperty({
        description: "Shows if todo is completed. Optional. Default - false"
    })
    @IsBoolean()
    @IsOptional()
    completed: boolean;
}
