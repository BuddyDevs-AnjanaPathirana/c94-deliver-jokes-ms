// src/jokes/jokes.controller.ts

import { Controller, Get, Query, NotFoundException } from '@nestjs/common';
import { JokesService } from './jokes.service';
import { Joke } from './entities/joke.entity';

@Controller('jokes')
export class JokesController {
  constructor(private readonly jokesService: JokesService) {}

  @Get('types')
  async getJokeTypes(): Promise<string[]> {
    return this.jokesService.getAllJokeTypes();
  }

  @Get('random')
  async getRandomJoke(
    @Query('type') typeName: string,
  ): Promise<{ id: number; content: string; type: string }> {
    if (!typeName) {
      throw new NotFoundException('Joke type must be specified.');
    }

    const joke: Joke = await this.jokesService.getRandomJokeByType(typeName);
    return {
      id: joke.id,
      content: joke.content,
      type: joke.type.name,
    };
  }
}
