import { Component, OnInit } from '@angular/core';

import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  constructor(private todoService: TodoService) {}

  ngOnInit() {
    this.todoService.sendMessage();
  }
}
