import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { TodoModule } from './todo/todo.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'crg23413',
      database: 'todos',
      entities: ["dist/**/*.entity{.ts,.js}"],
      synchronize: true,
    }),
    GraphQLModule.forRoot({
      cors: {
        origin: 'http://localhost:8080',
        credentials: true
      },
      playground: true,
      debug: true,
      autoSchemaFile: join(process.cwd(), 'src/graphql-schema.gql'),
    }),
    TodoModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
