import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ComplexityInterface, StatusInterface } from '../interfaces/todo.interface';

@Entity()
export class TodoEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  status: StatusInterface;

  @Column()
  title: string;

  @Column()
  subTitle: string;

  @Column()
  text: string;

  @Column()
  complexity: ComplexityInterface;
}
