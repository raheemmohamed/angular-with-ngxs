import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Select, Store } from "@ngxs/store";
import { Observable } from "rxjs";
import { User } from "src/app/model/user";
import { AddUser } from "src/app/store/state/user.action";
import { UserState } from "src/app/store/state/user.state";

@Component({
  selector: "app-create",
  templateUrl: "./create.component.html",
  styleUrls: ["./create.component.scss"],
})
export class CreateComponent implements OnInit {
  angForm: FormGroup;

  @Select(UserState.getUsers) users: Observable<User>;

  constructor(private fb: FormBuilder, private store: Store) {
    this.createForm();
  }

  createForm() {
    this.angForm = this.fb.group({
      name: ["", Validators.required],
      email: ["", Validators.required],
    });
  }

  addUser(name, email) {
    let id = Math.floor(Math.random() * 1000);
    console.log(name, email);
    this.store.dispatch(new AddUser({ id, name, email }));
  }

  ngOnInit() {}
}
