import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Observable } from 'rxjs';

import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';
import { MatDivider } from '@angular/material/divider';

import { CardComponent } from '../card/card.component';
import { CreateTodoComponent } from '../create-todo/create-todo.component';
import { TodoService } from '../../services/todo.service';
import { CreateTodoItemInterface, TodoItemInterface } from '../../interfaces/todo-item.interface';

@Component({
  selector: 'app-dashboard',
  imports: [DragDropModule, CardComponent, MatButton, MatDivider],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  createTodoComponentDialogRef: MatDialogRef<CreateTodoComponent> | undefined;

  backlogItems: TodoItemInterface[] = [];
  todoItems: TodoItemInterface[] = [];
  doneItems: TodoItemInterface[] = [];

  items$: Observable<CreateTodoItemInterface[]> = new Observable();

  constructor(private todoService: TodoService, private matDialog: MatDialog) {}

  ngOnInit() {
    this.todoService.getTodos();
    this.todoService.getAddedTodo();
    this.todoService.getUpdatedTodo();
    this.items$ = this.todoService.todoItems$;

    this.items$.pipe().subscribe(
      (itemsData: CreateTodoItemInterface[]) => {
        this.backlogItems = itemsData.filter((item: CreateTodoItemInterface) => item.status === 'BACKLOG');
        this.todoItems = itemsData.filter((item: CreateTodoItemInterface) => item.status === 'TODO');
        this.doneItems = itemsData.filter((item: CreateTodoItemInterface) => item.status === 'DONE');
    })

    // this.items$.pipe(
    //   tap((items: CreateTodoItemInterface[]) => {
    //     this.backlogItems = items.filter((item: CreateTodoItemInterface) => item.status === 'BACKLOG');
    //     this.todoItems = items.filter((item: CreateTodoItemInterface) => item.status === 'TODO');
    //     this.doneItems = items.filter((item: CreateTodoItemInterface) => item.status === 'DONE');
    //   }),
    // ).subscribe()
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

    const updatedItem: TodoItemInterface = event.container.data[event.currentIndex];
    this.todoService.updateTodo(updatedItem, event.container.id);
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
