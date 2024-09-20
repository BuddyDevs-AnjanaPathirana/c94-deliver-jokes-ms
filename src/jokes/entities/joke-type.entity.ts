// src/jokes/entities/joke-type.entity.ts

import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Joke } from './joke.entity';

@Entity('joke_types')
export class JokeType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @OneToMany(() => Joke, (joke) => joke.type)
  jokes: Joke[];
}
