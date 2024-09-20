// src/jokes/jokes.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Joke } from './entities/joke.entity';
import { JokeType } from './entities/joke-type.entity';

@Injectable()
export class JokesService {
  constructor(
    @InjectRepository(Joke)
    private readonly jokeRepository: Repository<Joke>,

    @InjectRepository(JokeType)
    private readonly jokeTypeRepository: Repository<JokeType>,
  ) {}

  async getRandomJokeByType(typeName: string): Promise<Joke> {
    const jokeType = await this.jokeTypeRepository.findOne({
      where: { name: typeName },
    });

    if (!jokeType) {
      throw new NotFoundException(`Joke type "${typeName}" not found.`);
    }

    const jokes = await this.jokeRepository.find({
      where: { type: jokeType },
    });

    if (jokes.length === 0) {
      throw new NotFoundException(`No jokes found for type "${typeName}".`);
    }

    const randomIndex = Math.floor(Math.random() * jokes.length);
    return jokes[randomIndex];
  }

  async getAllJokeTypes(): Promise<string[]> {
    const types = await this.jokeTypeRepository.find();
    return types.map((type) => type.name);
  }
}
