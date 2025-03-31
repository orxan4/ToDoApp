import { Component, OnInit } from '@angular/core';

import { CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

import { TodoService } from '../../services/todo.service';
import { CardComponent } from '../card/card.component';
import { TodoItemInterface } from '../../interfaces/todo-item.interface';

@Component({
  selector: 'app-dashboard',
  imports: [DragDropModule, CardComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  constructor(private todoService: TodoService) {}

  backlogItems: TodoItemInterface[] = [];
  todoItems: TodoItemInterface[] = [];
  doneItems: TodoItemInterface[] = [];
  items: TodoItemInterface[] = [
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
  ]

  ngOnInit() {
    this.todoService.sendMessage();
    this.todoService.getTodos();

    // refactor in next stories
    this.backlogItems = this.items.filter(item => item.status === 'BACKLOG');
    this.todoItems = this.items.filter(item => item.status === 'TODO');
    this.doneItems = this.items.filter(item => item.status === 'DONE');
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
}
