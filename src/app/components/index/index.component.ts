import { Component, OnDestroy, OnInit } from "@angular/core";
import { Actions, ofActionSuccessful, Select, Store } from "@ngxs/store";
import { Observable, Subject } from "rxjs";
import { User } from "src/app/model/user";
import { DeleteUser, UpdateUser } from "src/app/store/state/user.action";
import { UserState } from "src/app/store/state/user.state";

import { takeUntil } from "rxjs/operators";

@Component({
  selector: "app-index",
  templateUrl: "./index.component.html",
  styleUrls: ["./index.component.scss"],
})
export class IndexComponent implements OnInit, OnDestroy {
  // users: Observable<User>;

  /**
   * This is another way to get users from state and retrun as observable
   * Note:- if you are using "users" variable staright away and iterating on template then u need "Async" keyword
   */
  @Select(UserState.getUsers) users: Observable<User>;

  private ngUnsubscribe = new Subject();

  constructor(private store: Store, private actions$: Actions) {}

  ngOnInit() {
    /**
     * using snapshot we can get entire object from state
     */
    this.store.selectSnapshot((state) =>
      console.log("getting from snapshot", state.users.users)
    );

    /**
     * This is another way to retrive data from state
     */
    //this.users = this.store.select((state) => state.users.users);

    /**
     * This is for once action trigger we can write condition if you want there's several cycle
     *  ofAction: triggers when any of the below lifecycle events happen
        ofActionDispatched: triggers when an action has been dispatched
        ofActionSuccessful: triggers when an action has been completed successfully
        ofActionCanceled: triggers when an action has been canceled
        ofActionErrored: triggers when an action has caused an error to be thrown
        ofActionCompleted: triggers when an action has been completed whether it was successful or not (returns completion summary)
     */
    this.actions$
      .pipe(ofActionSuccessful(DeleteUser), takeUntil(this.ngUnsubscribe))
      .subscribe(() => alert("Item deleted"));
  }

  deleteUser(id: number) {
    /**
     * This is how you trigger your action
     * this.store.dispatch(new DeleteUser(id))
     * If you require to subcribe you can do that as well
     */
    this.store.dispatch(new DeleteUser(id)).subscribe(
      (res) => {
        console.log("dispatch delete", res);
      },
      (error) => {
        console.log(error); // `Error` that was thrown by the `getNovelById` handler
      }
    );
  }

  updateUser(payload) {
    // payload.name = "OOOH This is is awesome";
    let updateData = {
      id: payload.id,
      name: "OOOHHHHH",
      email: payload.email,
    };
    this.store.dispatch(new UpdateUser(updateData));
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
