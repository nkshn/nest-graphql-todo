import { Todo } from './entities/todo.entity';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-task.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Resolver(() => Todo)
export class TodoResolver {

  constructor(private todoService: TodoService) {}

  @Query(() => [Todo], { description: "getting all todo task's" })
  findAllTodos() {
    return this.todoService.findAll();
  }

  @Mutation(() => Todo, { description: "creating new todo task" })
  create(@Args('todo') todo:CreateTodoDto) {
    return this.todoService.createTodo(todo);
  }

  @Mutation(() => Todo, { description: "update name of todo" })
  updateTodo(@Args('UpdateTodoDto') updateTodoDto:UpdateTodoDto) {
    return this.todoService.updateTodo(updateTodoDto.id, updateTodoDto);
  }

  @Mutation(() => Boolean, { description: "delete name of todo" })
  deleteTodoById(@Args('id') id: string) {
    return this.todoService.deleteTodoById(id);
  }
}