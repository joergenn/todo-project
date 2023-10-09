import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards, ValidationPipe, Req } from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Request } from 'express';
import { ConfigService} from '@nestjs/config';

@Controller('todos')
@UseGuards(JwtAuthGuard)
export class TodosController {
  constructor(private readonly todosService: TodosService, private configService: ConfigService) {}

  @Post()
  create(@Body() createTodoDto: CreateTodoDto, @Req() request: Request) {
    const token = request.headers['authorization'].replace('Bearer ', '');
    return this.todosService.create(createTodoDto, token);
  }

  @Get()
  findAll(@Req() request: Request) {
    const token = request.headers['authorization'].replace('Bearer ', '');
    return this.todosService.findAll(token);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number, @Req() request: Request) {
    const token = request.headers['authorization'].replace('Bearer ', '');
    return this.todosService.findOne(id, token);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateTodoDto: UpdateTodoDto, @Req() request: Request) {
    const token = request.headers['authorization'].replace('Bearer ', '');
    return this.todosService.update(id, updateTodoDto, token);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number, @Req() request: Request) {
    const token = request.headers['authorization'].replace('Bearer ', '');
    return this.todosService.remove(id, token);
  }
}
