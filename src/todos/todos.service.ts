import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './entities/todo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as jwt from 'jsonwebtoken';
import { ConfigService} from '@nestjs/config';
import { UsersService } from 'src/users/users.service';
import { NotFoundException, BadRequestException} from '@nestjs/common';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo)
    private todos: Repository<Todo>,
    private configService: ConfigService,
    private usersService: UsersService,
  ){}

  async create(createTodoDto: CreateTodoDto, token: string) {
    try {
      const decoded = jwt.verify(token, this.configService.get('SECRET'));
      const user = await this.usersService.findOne(+decoded.sub);
      const newTodo = this.todos.create({...createTodoDto, user: user});
      return this.todos.save(newTodo);
    } catch (error) {
      console.error('Error decoding JWT token:', error);
      return null;
    }
  }

  async findAll(token: string) {
    let decoded: string | jwt.JwtPayload;
    try {
      decoded = jwt.verify(token, this.configService.get('SECRET'));
    } catch (error) {
      console.error('Error decoding JWT token:', error);
      throw new BadRequestException("Failed to verify user");
    }
    const userId = +decoded.sub;
    const user = await this.usersService.findOne(userId);
    return this.todos.find({
      where: {
        user: user
      }
    });
  }

  async findOne(id: number, token: string) {
    let decoded: string | jwt.JwtPayload;
    try {
      decoded = jwt.verify(token, this.configService.get('SECRET'));
    } catch (error) {
      console.error('Error decoding JWT token:', error);
      throw new BadRequestException("Failed to verify user");
    }
    const userId = +decoded.sub;
    const todo = await this.todos.findOne({
      where: {
        id: id
      }
    });
    if(!todo){
      throw new NotFoundException("Todo with such id not found");
    }
    if(todo.user.id !== userId) throw new BadRequestException("User cannot read other user's todo");
    return todo;
  }

  async update(id: number, updateTodoDto: UpdateTodoDto, token: string) {
    let decoded: string | jwt.JwtPayload;
    try {
      decoded = jwt.verify(token, this.configService.get('SECRET'));
    } catch (error) {
      console.error('Error decoding JWT token:', error);
      throw new BadRequestException("Failed to verify user");
    }
    const userId = +decoded.sub;
    const todo = await this.findOne(id, token); 
    if(todo.user.id !== userId) throw new BadRequestException("User cannot update other user's todos");
    return this.todos.save({...todo, ...updateTodoDto});
  }

  async remove(id: number, token: string) {
    let decoded: string | jwt.JwtPayload;
    try {
      decoded = jwt.verify(token, this.configService.get('SECRET'));
    } catch (error) {
      console.error('Error decoding JWT token:', error);
      throw new BadRequestException("Failed to verify user");
    }
    const userId = +decoded.sub;
    const todo = await this.findOne(id, token); 
    if(todo.user.id !== userId) throw new BadRequestException("User cannot delete other user's todos");
    return this.todos.remove(todo);
  }
}
