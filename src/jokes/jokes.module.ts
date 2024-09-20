// src/jokes/jokes.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JokesService } from './jokes.service';
import { JokesController } from './jokes.controller';
import { Joke } from './entities/joke.entity';
import { JokeType } from './entities/joke-type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Joke, JokeType])],
  controllers: [JokesController],
  providers: [JokesService],
})
export class JokesModule {}
