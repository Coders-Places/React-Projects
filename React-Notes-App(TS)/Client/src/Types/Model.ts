export interface Todo {
  _id?: number | string;
  _user?: number | string;
  title: string;
  description: string;
  isDone: boolean | false;
  createdAt?: Date;
  updatedAt?: Date;
}

// export type Todo = {
//   _id: number | string;
//   _todoTitle: string;
//   _todoDesc: string;
//   _done: boolean;
// };


export type postUserBodyField = string | "";

export interface serverResponse {
  success: boolean;
  message: string;
  userAllNotes: Todo[];
}
