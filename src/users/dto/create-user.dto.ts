import { ApiProperty } from "@nestjs/swagger";
import { MinLength, IsAlphanumeric, IsDefined, IsEmail, Matches } from "class-validator";

export class CreateUserDto {
    @ApiProperty({
        description: 'Name of the user'
    })
    @IsAlphanumeric()
    @MinLength(3)
    @IsDefined()
    username: string;

    @ApiProperty({
        description: 'Email of the user'
    })
    @IsEmail()
    email: string;

    @ApiProperty({
        description: 'Password of the user'
    })
    @Matches(/^([a-zA-Z]|\d|(_|-|!)){3,}$/, {message: "Password can contain only alphanumeric values or ! or _ or -"})
    password: string;
}
