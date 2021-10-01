import { Todo } from './entities/todo.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoResolver } from './todo.resolver';

@Module({
  imports: [
    TypeOrmModule.forFeature([Todo])
  ],
  providers: [TodoService, TodoResolver]
})
export class TodoModule {}
