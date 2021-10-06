import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTodoDto } from './dto/create-task.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './entities/todo.entity';

@Injectable()
export class TodoService {

  constructor(@InjectRepository(Todo) private todoRepository:Repository<Todo>) {}

  async createTodo(createdTodoDbo: CreateTodoDto): Promise<Todo> {

    try {
      const createdTodo = this.todoRepository.create(createdTodoDbo);
      return this.todoRepository.save(createdTodo);
    } catch (e) {
      console.error("Error on creating todo, err: ", e);
      throw new InternalServerErrorException({
        message: 'Something has gone wrong !('
      });
    }
  }
  
  async findAll(): Promise<Todo[]> {
    try {
      return await this.todoRepository.find({
        order: {
          isDone: "ASC", // sorting: firstly will be -> not done task's
          createdAt: "DESC" // sorting: secondary will be -> lastest actual todo's (by date of creation)
      }
      });
    } catch (e) {
      console.error("Error on finding todos, err: ", e);
      throw new InternalServerErrorException({
        message: 'Something has gone wrong !('
      });
    }
  }

  async updateTodo(id: string, updateTodoDto: UpdateTodoDto): Promise<Todo> {
    try {
      const founededTodo = await this.todoRepository.findOne({ where: { id: id } });
      
      if(!founededTodo) {
        throw new NotFoundException({
          message: 'Todo not found!'
        });
      }

      const updatedTodo = await this.todoRepository.save({
        ...founededTodo,
        ...updateTodoDto
      });
      
      return updatedTodo;
    } catch (e) {
      console.error("Error on updating todo, err: ", e);
      throw new InternalServerErrorException({
        message: 'Something has gone wrong !('
      });
    }
  }

  async deleteTodoById(id: string): Promise<Boolean> {
    try {
      const deletedTodo = await this.todoRepository.delete(id);

      if(deletedTodo.affected > 0) { // checking how many items were deleted
        return true;
      } else {
        return false;
      }
    } catch (e) {
      console.error("Error on deleting todo, err: ", e);
      throw new InternalServerErrorException({
        message: 'Something has gone wrong !('
      });
    }
  }
}