import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './entities/todo.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo)
    private todos: Repository<Todo>,
  ){}
  create(createTodoDto: CreateTodoDto) {
    const newTodo = this.todos.create(createTodoDto);
    console.log(newTodo);
    return this.todos.save(newTodo);
  }

  findAll() {
    console.log(process.env)
    return this.todos.find();
  }

  async findOne(id: number) {
    const todo = await this.todos.find({
      where: {
        id: id
      }
    });
    if(Object.keys(todo).length === 0) {
      throw new HttpException("Todo with such id not found", HttpStatus.NOT_FOUND)
    }; 
    return todo;
  }

  async update(id: number, updateTodoDto: UpdateTodoDto) {
    const todo = await this.findOne(id); 
    return this.todos.save({...todo[0], ...updateTodoDto});
  }

  async remove(id: number) {
    const todo = await this.findOne(id);
    return this.todos.remove(todo);
  }
}
