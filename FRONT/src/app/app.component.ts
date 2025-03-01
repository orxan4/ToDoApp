import { Component, OnInit } from '@angular/core';

import { TestService } from './services/test.service';
import { TestInterface } from './interfaces/test.interface';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  valueFromBackend$: string = 'Not found';

  constructor(private testService: TestService) {}

  async ngOnInit(): Promise<void> {
    const value: TestInterface = await this.testService.getUserById(1);
    if (value) this.valueFromBackend$ = value.title;
  }
}
