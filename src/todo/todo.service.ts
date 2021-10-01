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
      return this.todoRepository.find();
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

      const updatedUser = await this.todoRepository.save({
        ...founededTodo,
        ...updateTodoDto
      });
      
      return updatedUser;
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

      if(deletedTodo.affected > 0) {
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