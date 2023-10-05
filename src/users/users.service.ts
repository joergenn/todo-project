import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private users: Repository<User>,
  ){}

  create(createUserDto: CreateUserDto) {
    const newUser = this.users.create(createUserDto);
    return this.users.save(newUser);
  }

  findAll() {
    return this.users.find();
  }

  async findOne(id: number) {
    const user = await this.users.find({
      where: {
        id: id
      }
    });
    if(Object.keys(user).length === 0) {
      throw new HttpException("User with such id not found", HttpStatus.NOT_FOUND)
    }; 
    return user;
  }

  async findByEmail(email: string) {
    const user = await this.users.find({
      where: {
        email: email
      }
    });
    if(Object.keys(user).length === 0) {
      throw new HttpException("User with such email not found", HttpStatus.NOT_FOUND)
    }; 
    return user[0];
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);
    Object.keys(updateUserDto).forEach(key => {
      user[0][key] = updateUserDto[key];
    })
    return this.users.save(user);
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    return this.users.remove(user);
  }
}
