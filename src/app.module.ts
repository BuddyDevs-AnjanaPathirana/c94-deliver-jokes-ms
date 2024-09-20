// src/app.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { JokesModule } from './jokes/jokes.module';
import { JokeType } from './jokes/entities/joke-type.entity';
import { Joke } from './jokes/entities/joke.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [JokeType, Joke],
      synchronize: true, // **Note**: Set to false in production
    }),
    JokesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
