import { HttpException, HttpStatus, Injectable, Req } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './entities/todo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as jwt from 'jsonwebtoken';
import { ConfigService} from '@nestjs/config';
import { UsersService } from 'src/users/users.service';
import { NotFoundException, BadRequestException} from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';

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

  async findAll(id: number) {
    const user = await this.usersService.findOne(id);
    return this.todos.find({
      where: {
        user: user
      }
    });
  }

  async findOne(id: number, user: number) {
    const todo = await this.todos.findOne({
      where: {
        id: id
      }
    });
    if(!todo){
      throw new NotFoundException("Todo with such id not found");
    }
    if(todo.user.id !== user) throw new BadRequestException("User cannot read other user's todo");
    return todo;
  }

  async update(id: number, updateTodoDto: UpdateTodoDto, user: number) {
    const todo = await this.findOne(id, user); 
    if(todo.user.id !== user) throw new BadRequestException("User cannot update other user's todos");
    return this.todos.save({...todo, ...updateTodoDto});
  }

  async remove(id: number, user: number) {
    const todo = await this.findOne(id, user); 
    if(todo.user.id !== user) throw new BadRequestException("User cannot delete other user's todos");
    return this.todos.remove(todo);
  }
}
