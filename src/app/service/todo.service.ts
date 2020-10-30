import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { ITodo } from "../model/user";

@Injectable({
  providedIn: "root",
})
export class TodoService {
  constructor(private http: HttpClient) {}

  addTodo(payload: ITodo) {
    let url = environment.apiEndpointUrl;

    return this.http.post<ITodo>(url, payload);
  }

  getTodoList() {
    let url = environment.apiEndpointUrl;
    this.http.get(url).pipe(map((res: any) => res));
  }

  getTodoListById(id) {
    let url = environment.apiEndpointUrl + `/${id}`;
    this.http.get(url).pipe(map((res: any) => res));
  }

  updateTodo(payload: ITodo, id: number) {
    let url = environment.apiEndpointUrl + `/${id}`;

    return this.http.put<ITodo>(url, payload);
  }
}
