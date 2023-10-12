import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './entities/todo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';
import { User } from '../users/entities/user.entity';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo)
    private todos: Repository<Todo>,
  ){}

  async create(createTodoDto: CreateTodoDto, user: User) {
    const newTodo = this.todos.create({...createTodoDto, userId: user.id});
    return this.todos.save(newTodo);
  }

  async findAll(user: User) {
    return this.todos.find({
      where: {
        userId: user.id
      }
    });
  }

  async findOne(id: number, user: User) {
    const todo = await this.todos.findOne({
      where: {
        id: id,
        userId: user.id
      }
    });
    if(!todo){
      throw new NotFoundException("Todo with such id not found");
    }
    return todo;
  }

  async update(id: number, updateTodoDto: UpdateTodoDto, user: User) {
    const todo = await this.findOne(id, user); 
    return this.todos.save({...todo, ...updateTodoDto});
  }

  async remove(id: number, user: User) {
    const todo = await this.findOne(id, user); 
    return this.todos.remove(todo);
  }
}
