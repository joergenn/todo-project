import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards, ValidationPipe, Req } from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Request } from 'express';
import { ConfigService} from '@nestjs/config';
import { User } from 'src/users/entities/user.entity';

@Controller('todos')
@UseGuards(JwtAuthGuard)
export class TodosController {
  constructor(private readonly todosService: TodosService, private configService: ConfigService) {}

  @Post()
  create(@Body() createTodoDto: CreateTodoDto, @Req() req: Request) {
    const token = req.headers['authorization'].replace('Bearer ', '');
    return this.todosService.create(createTodoDto, token);
  }

  @Get()
  findAll(@Req() req: Request) {
    return this.todosService.findAll(req.user['id']);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number, @Req() req: Request) {
    return this.todosService.findOne(id, req.user['id']);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateTodoDto: UpdateTodoDto, @Req() req: Request) {
    return this.todosService.update(id, updateTodoDto, req.user['id']);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number, @Req() req: Request) {
    return this.todosService.remove(id, req.user['id']);
  }
}
