import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {
  Actions,
  ofActionErrored,
  ofActionSuccessful,
  Store,
} from "@ngxs/store";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { AddArticle } from "../../store/articles.actions";

@Component({
  selector: "app-articles-create",
  templateUrl: "./articles-create.component.html",
  styleUrls: ["./articles-create.component.scss"],
})
export class ArticlesCreateComponent implements OnInit, OnDestroy {
  articleForm: FormGroup;
  private ngUnsubscribe = new Subject();

  constructor(
    private formBuilder: FormBuilder,
    private store: Store,
    private actions: Actions
  ) {}

  ngOnInit() {
    this.intializeForm();

    this.actions
      .pipe(ofActionSuccessful(AddArticle), takeUntil(this.ngUnsubscribe))
      .subscribe(() => this.resetForm());

    this.actions
      .pipe(ofActionErrored(AddArticle), takeUntil(this.ngUnsubscribe))
      .subscribe((res) => console.log("error pipe", res));
  }

  intializeForm() {
    this.articleForm = this.formBuilder.group({
      title: ["", Validators.required],
      description: ["", Validators.required],
    });
  }

  addArticles(payload) {
    let article = {
      ...payload,
    };
    this.store.dispatch(new AddArticle(article));
  }

  resetForm() {
    this.articleForm.reset();
    this.articleForm.markAsPristine();
    this.articleForm.untouched;
  }

  ngOnDestroy() {
    this.ngUnsubscribe.unsubscribe();
  }
}
