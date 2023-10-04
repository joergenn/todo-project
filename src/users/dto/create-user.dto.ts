import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
    @ApiProperty({
        description: 'Name of the user'
    })
    username: string;

    @ApiProperty({
        description: 'Email of the user'
    })
    email: string;

    @ApiProperty({
        description: 'Password of the user'
    })
    password: string;
}
