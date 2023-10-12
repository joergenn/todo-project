import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards, Req } from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Request } from 'express';
import { CurrentUser } from 'src/decorators/user.decorator';
import { User } from 'src/users/entities/user.entity';

@Controller('todos')
@UseGuards(JwtAuthGuard)
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post()
  create(@Body() createTodoDto: CreateTodoDto, @Req() req: Request, @CurrentUser() user: User) {
    return this.todosService.create(createTodoDto, user);
  }

  @Get()
  findAll(@Req() req: Request, @CurrentUser() user: User) {
    return this.todosService.findAll(user);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number, @Req() req: Request, @CurrentUser() user: User) {
    return this.todosService.findOne(id, user);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateTodoDto: UpdateTodoDto, @Req() req: Request, @CurrentUser() user: User) {
    return this.todosService.update(id, updateTodoDto, user);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number, @Req() req: Request, @CurrentUser() user: User) {
    return this.todosService.remove(id, user);
  }
}
