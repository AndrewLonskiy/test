import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/index";
import {tap} from "rxjs/internal/operators";


export interface Todo {
  id: number
  title: string
  completed: boolean
  date?: any
}

@Injectable({providedIn: 'root'})

export class TodosService {

  public todos: Todo[] = [
    // {id: 1, title: 'do something 1', completed: false, date: new Date()},
    // {id: 2, title: 'do something 2', completed: true, date: new Date()},
    // {id: 3, title: 'do something 3', completed: false, date: new Date()}
  ];

  constructor(private http: HttpClient) {}

  fetchTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>('https://jsonplaceholder.typicode.com/todos?_limit=30')
      .pipe(tap(todos => this.todos = todos))
  }

  onToggle(id: number) {
    const idx = this.todos.findIndex(t => t.id === id);
    this.todos[idx].completed = !this.todos[idx].completed
  }

  removeTodo(id: number) {
    this.todos = this.todos.filter(t => t.id !== id)
  }

  addTodo(todo: Todo){
    this.todos.push(todo);
  }
}
