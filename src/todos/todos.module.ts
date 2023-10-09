import { Module, RequestMethod, MiddlewareConsumer } from '@nestjs/common';
import { TodosService } from './todos.service';
import { TodosController } from './todos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from './entities/todo.entity';
import { UsersModule } from 'src/users/users.module';
import { ValidateMiddleware } from 'src/middleware/validate.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([Todo]), UsersModule],
  controllers: [TodosController],
  providers: [TodosService],
})
export class TodosModule {
  configure(consumer: MiddlewareConsumer){
    consumer
      .apply(ValidateMiddleware)
      .exclude({
        path: '/todos',
        method: RequestMethod.POST,
      })
      .forRoutes(TodosController)
  }
}
