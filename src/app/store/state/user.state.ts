import { State, Action, StateContext, Selector } from "@ngxs/store";
import {
  patch,
  append,
  removeItem,
  insertItem,
  updateItem,
} from "@ngxs/store/operators";

import { User } from "src/app/model/user";
import { AddUser, DeleteUser, UpdateUser } from "./user.action";

//This is your stateModel
export class UserStateModel {
  users: User[];
}

// This is your state with preload default user data
@State<UserStateModel>({
  name: "users",
  defaults: {
    users: [
      {
        id: 179,
        name: "das",
        email: "saddasd",
      },
    ],
  },
})

// State main class
export class UserState {
  /**
   * 1. @Selector() is declared (memoized) so that it can be used elsewhere
   * 2. These memoized selectors can be used via @Select(Xxx)
   **/
  @Selector()
  static getUsers(state: UserStateModel) {
    return state.users;
  }

  /**
   *
   * @param AddUser // this is Action item declared in user.action.ts
   * Actions can either be thought of as a command which should trigger something to happen,
   * or as the resulting event of something that has already happened.
   */
  @Action(AddUser)
  add(
    { getState, patchState }: StateContext<UserStateModel>,
    { payload }: AddUser
  ) {
    const state = getState(); //getting current state
    patchState({
      users: [...state.users, payload],
    });
  }

  /**
   *
   * @param removeItem // this is state operator for removed data
   * @param getState // this is use for current state information
   */
  @Action(DeleteUser)
  delete(
    { getState, patchState, setState }: StateContext<UserStateModel>,
    { id }
  ) {
    const state = getState();

    setState(
      patch({
        users: removeItem<User>((user) => user.id === id),
      })
    );
  }

  /**
   * @Action // this is how action decorator looks likes
   * @param updateItem // this is state operator for removed data
   * @param ctx  // this is include state context informations
   */
  @Action(UpdateUser) update(
    ctx: StateContext<UserStateModel>,
    { payload }: UpdateUser
  ) {
    const state = ctx.getState();

    console.log("update state", state);

    ctx.setState(
      patch({
        users: updateItem<User>(
          (user) => user.id === payload.id,
          patch({ id: payload.id, name: payload.name, email: payload.email })
        ),
      })
    );
  }
}
