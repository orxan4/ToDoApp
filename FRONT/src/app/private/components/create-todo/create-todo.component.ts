import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { MatError, MatFormField, MatHint } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatOption, MatSelect } from '@angular/material/select';
import { MatButton } from '@angular/material/button';
import { MatDialogRef } from '@angular/material/dialog';

import { TodoService } from '../../services/todo.service';
import { complexityValues, statusValues } from '../../constants/private-item.constants';
import { ComplexityInterface, CreateTodoItemInterface, StatusInterface } from '../../interfaces/todo-item.interface';

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
    complexity: new FormControl<string>('EASY', [Validators.required]),
    status: new FormControl<string>('BACKLOG', [Validators.required]),
  });

  constructor(private todoService: TodoService, private dialogRef: MatDialogRef<CreateTodoComponent>) {}

  get title(): FormControl<string> {
    return this.form.get('title') as FormControl;
  }
  get subTitle(): FormControl<string> {
    return this.form.get('subTitle') as FormControl;
  }
  get text(): FormControl<string> {
    return this.form.get('text') as FormControl;
  }
  get complexity(): FormControl<ComplexityInterface> {
    return this.form.get('complexity') as FormControl;
  }
  get status(): FormControl<StatusInterface> {
    return this.form.get('status') as FormControl;
  }

  onCreateTodo() {
    if (this.form.valid) {
      const todo: CreateTodoItemInterface = {
        title: this.title.value,
        subTitle: this.subTitle.value,
        text: this.text.value,
        complexity: this.complexity.value,
        status: this.status.value,
      }

      this.todoService.saveTodo(todo);
      this.dialogRef.close();
    }
  }
}
