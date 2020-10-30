export interface User {
  id: number;
  name: string;
  email: string;
}

export interface ITodo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}
