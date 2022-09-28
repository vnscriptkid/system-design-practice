import { Injectable } from '@nestjs/common';
import * as fs from 'fs/promises';

@Injectable()
export class AppService {
  constructor() {
    this.fibonacci = this.fibonacci.bind(this);
  }

  getHello(): string {
    return 'Hello World!';
  }

  fibonacci(n: number) {
    if (n <= 1) return n;

    return this.fibonacci(n - 1) + this.fibonacci(n - 2);
  }

  async readTodos() {
    const todos = await fs.readFile('./src/todos.json', { encoding: 'utf-8' });

    return JSON.parse(todos);
  }
}
