import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { TestInterface } from '../interfaces/test.interface';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TestService {
  constructor(private http: HttpClient) {}

  getUserById(id: number): Promise<TestInterface> {
    return firstValueFrom(this.http.get<TestInterface>(`/api/users/${id}`));
  }
}
