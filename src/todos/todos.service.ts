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
    private todosRepository: Repository<Todo>,
  ){}
  create(createTodoDto: CreateTodoDto) {
    const newTodo = this.todosRepository.create(createTodoDto);
    console.log(newTodo);
    return this.todosRepository.save(newTodo);
  }

  findAll() {
    return this.todosRepository.find();
  }

  async findOne(id: number) {
    const todo = await this.todosRepository.find({
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
    return this.todosRepository.save({...todo[0], ...updateTodoDto});
  }

  async remove(id: number) {
    const todo = await this.findOne(id);
    return this.todosRepository.remove(todo);
  }
}
