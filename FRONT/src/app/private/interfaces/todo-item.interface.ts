import { UserModel } from '../../public/interfaces/user.interfaces';

export interface TodoItemInterface {
  id?: number;
  createdBy?: UserModel;
  updatedBy?: UserModel;
  createdAt?: Date;
  updatedAt?: Date;

  status: Status;
  title: string;
  subTitle: string;
  text: string;
  complexity: Complexity;
}

export type Status = 'BACKLOG' | 'TODO' | 'DONE';
export type Complexity = 'EASY' | 'MEDIUM' | 'HARD';
