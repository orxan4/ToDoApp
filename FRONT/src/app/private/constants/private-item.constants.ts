import { ComplexityInterface, CreateTodoItemInterface, StatusInterface } from '../interfaces/todo-item.interface';

export const complexityValues: ComplexityInterface[] = ['EASY', 'MEDIUM', 'HARD'];
export const statusValues: StatusInterface[] = ['BACKLOG', 'TODO', 'DONE'];

export const todoExampleItems: CreateTodoItemInterface[] = [
  {
    title: 'Hard Item',
    complexity: 'HARD',
    subTitle: 'Hard Subtitle',
    text: 'Hard Text',
    status: 'BACKLOG',
  },
  {
    title: 'Medium Item',
    complexity: 'MEDIUM',
    subTitle: 'Medium Subtitle',
    text: 'Medium Text',
    status: 'TODO',
  },
  {
    title: 'Easy Item',
    complexity: 'EASY',
    subTitle: 'Easy Subtitle',
    text: 'Easy Text',
    status: 'DONE',
  },
  {
    title: 'Example Item',
    complexity: 'MEDIUM',
    subTitle: 'Example Subtitle',
    text: 'Example Text',
    status: 'DONE',
  },
];
