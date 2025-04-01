import { UserDto } from '../../user/interfaces/user.interface';

export interface TodoItemInterface {
  id?: number;
  createdBy?: UserDto;
  updatedBy?: UserDto;
  createdAt?: Date;
  updatedAt?: Date;

  status: StatusInterface;
  title: string;
  subTitle: string;
  text: string;
  complexity: ComplexityInterface;
}

export type StatusInterface = 'BACKLOG' | 'TODO' | 'DONE';
export type ComplexityInterface = 'EASY' | 'MEDIUM' | 'HARD';

export interface CreateTodoItemInterface {
  status: StatusInterface;
  title: string;
  subTitle: string;
  text: string;
  complexity: ComplexityInterface;
}
