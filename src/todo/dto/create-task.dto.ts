import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateTodoDto {
  
  @Field()
  name: string
}