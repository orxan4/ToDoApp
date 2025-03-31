import { Component, Input } from '@angular/core';
import { TodoItemInterface } from '../../interfaces/todo-item.interface';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-card',
  imports: [NgClass],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  @Input() item: TodoItemInterface | undefined;
}
