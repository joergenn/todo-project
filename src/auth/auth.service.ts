import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService, private jwtService: JwtService){}
    
    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.usersService.findByEmail(email);
        const isMatch = await bcrypt.compare(password, user.password);
        if (user && isMatch) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async login(user: User){
        const payload = { username: user.username, sub: user.id };
         return {
            access_token: this.jwtService.sign(payload)
        }
    }
}
