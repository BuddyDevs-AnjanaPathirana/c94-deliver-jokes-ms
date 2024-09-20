// src/jokes/entities/joke.entity.ts

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { JokeType } from './joke-type.entity';

@Entity('jokes')
export class Joke {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  content: string;

  @ManyToOne(() => JokeType, (type) => type.jokes, { eager: true })
  type: JokeType;
}
