import { NestMiddleware, Injectable } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import * as jwt from 'jsonwebtoken';
import { BadRequestException } from "@nestjs/common/exceptions";
import { ConfigService } from "@nestjs/config";
import { UsersService } from "src/users/users.service";
import { User } from "src/users/entities/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class ValidateMiddleware implements NestMiddleware{
    constructor(
        private readonly configService: ConfigService,
        private readonly usersService: UsersService,
    ) {}
       
    async use(req: Request & { user: User }, res: Response, next: NextFunction){
        const token = req.headers['authorization'].replace('Bearer ', '');
        let decoded: string | jwt.JwtPayload;
        try {
          decoded = jwt.verify(token, this.configService.get('SECRET'));
        } catch (error) {
          console.error('Error decoding JWT token:', error);
          throw new BadRequestException("Failed to verify user");
        }
        const userId = +decoded.sub;
        req.user = await this.usersService.findOne(userId);
        next();
    }
}