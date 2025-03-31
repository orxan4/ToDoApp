import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { MatError, MatFormField, MatHint } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatOption, MatSelect } from '@angular/material/select';
import { MatButton } from '@angular/material/button';

import { ComplexityInterface, StatusInterface } from '../../interfaces/todo-item.interface';
import { complexityValues, statusValues } from '../../constants/private-item.constants';

@Component({
  selector: 'app-create-todo',
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatError,
    MatSelect,
    MatOption,
    MatHint,
    MatButton,
  ],
  templateUrl: './create-todo.component.html',
  styleUrl: './create-todo.component.scss',
})
export class CreateTodoComponent {
  complexityValues: ComplexityInterface[] = complexityValues;
  statusValues: StatusInterface[] = statusValues;

  form: FormGroup = new FormGroup({
    title: new FormControl<string | null>(null, [Validators.required]),
    subTitle: new FormControl<string | null>(null, [Validators.required]),
    text: new FormControl<string | null>(null, [Validators.required]),
    complexity: new FormControl<string | null>('EASY', [Validators.required]),
    status: new FormControl<string | null>('BACKLOG', [Validators.required]),
  });

  get title() {
    return this.form.get('title') as FormControl;
  }
  get subTitle() {
    return this.form.get('subTitle') as FormControl;
  }
  get text() {
    return this.form.get('text') as FormControl;
  }

  onCreateTodo() {
    console.log("Works");
    console.log(this.form.value);
  }
}
