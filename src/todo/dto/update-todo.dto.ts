import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateTodoDto {

  @Field()
  id: string
  
  @Field({ nullable: true })
  name?: string
  
  @Field({ nullable: true })
  isDone?: boolean
}