import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { NotFoundException} from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private users: Repository<User>,
  ){}

  async create(createUserDto: CreateUserDto) {
    const hash = await bcrypt.hash(createUserDto.password, 10);
    const newUser = this.users.create({...createUserDto, password: hash});
    return this.users.save(newUser);
  }

  // findAll() {
  //   return this.users.find();
  // }

  async findOne(id: number) {
    const user = await this.users.findOne({
      where: {
        id: id
      }
    });
    if(!user){
      throw new NotFoundException("User with such id not found");
    }
    return user;
  }

  async findByEmail(email: string) {
    const user = await this.users.findOne({
      where: {
        email: email
      }
    });
    if(!user){
      throw new NotFoundException("User with such email not found");
    }
    return user;
  }

  // async update(id: number, updateUserDto: UpdateUserDto) {
  //   const user = await this.findOne(id);
  //   const hash = await bcrypt.hash(updateUserDto.password, 10);
  //   const updatedUser = this.users.create({...user, ...updateUserDto, password: hash});
  //   return this.users.save(updatedUser);
  // }

  // async remove(id: number) {
  //   const user = await this.findOne(id);
  //   return this.users.remove(user);
  // }
}
