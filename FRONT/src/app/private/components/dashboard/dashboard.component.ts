import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';
import { MatDivider } from '@angular/material/divider';

import { TodoService } from '../../services/todo.service';
import { CardComponent } from '../card/card.component';
import { CreateTodoComponent } from '../create-todo/create-todo.component';
import { CreateTodoItemInterface, TodoItemInterface } from '../../interfaces/todo-item.interface';
import { todoExampleItems } from '../../constants/private-item.constants';

@Component({
  selector: 'app-dashboard',
  imports: [DragDropModule, CardComponent, MatButton, MatDivider],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  createTodoComponentDialogRef: MatDialogRef<CreateTodoComponent> | undefined;
  constructor(
    private todoService: TodoService,
    private matDialog: MatDialog,
  ) {}

  backlogItems: TodoItemInterface[] = [];
  todoItems: TodoItemInterface[] = [];
  doneItems: TodoItemInterface[] = [];
  items: CreateTodoItemInterface[] = todoExampleItems;

  ngOnInit() {
    this.todoService.sendMessage();
    this.todoService.getTodos();

    // refactor in next stories
    this.backlogItems = this.items.filter((item) => item.status === 'BACKLOG');
    this.todoItems = this.items.filter((item) => item.status === 'TODO');
    this.doneItems = this.items.filter((item) => item.status === 'DONE');
  }

  drop(event: CdkDragDrop<TodoItemInterface[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  onShowCreateTodoDialog() {
    this.createTodoComponentDialogRef = this.matDialog.open(
      CreateTodoComponent,
      {
        minHeight: '400px',
        minWidth: '300px',
      },
    );
  }
}
