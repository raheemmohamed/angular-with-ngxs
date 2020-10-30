/**
 * below is Model
 */
import { User } from "../../model/user";

// This the place where u should add action type
export enum ActionsType {
  ADD_USER = "[User] Add",
  DELETE_USER = "[User] Delete",
  UPDATE_USER = "[User] Update",
}
//This is how you should declare action methods
export class AddUser {
  static readonly type = ActionsType.ADD_USER; //action type
  constructor(public payload: User) {} //payload information
}

export class DeleteUser {
  static readonly type = ActionsType.DELETE_USER;
  constructor(public id: number) {}
}

export class UpdateUser {
  static readonly type = ActionsType.UPDATE_USER;
  constructor(public payload: User) {}
}
