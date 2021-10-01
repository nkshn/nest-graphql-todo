import { ObjectType, Field } from '@nestjs/graphql';
import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";

@ObjectType()
@Entity()
export class Todo {
  
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string
  
  @Field()
  @Column({ type: String, default: "", nullable: false })
  name: string
  
  @Field()
  @Column({ type: Boolean, default: false })
  isDone: boolean
  
  @Field()
  @CreateDateColumn()
  createdAt: Date
  
  @Field()
  @UpdateDateColumn()
  updatedAt: Date

}