import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { IArticle } from "../../store/articles-model";

import { Actions, ofActionSuccessful, Select, Store } from "@ngxs/store";
import { ArticlesState } from "../../store/articles.state";
import {
  AddArticle,
  DeleteArticle,
  GetAllArticles,
  UpdateArticle,
} from "../../store/articles.actions";

@Component({
  selector: "app-articles-list",
  templateUrl: "./articles-list.component.html",
  styleUrls: ["./articles-list.component.scss"],
})
export class ArticlesListComponent implements OnInit {
  articleLoadedStatus: boolean;

  @Select(ArticlesState.getArticles) articles: Observable<IArticle>;

  constructor(private store: Store) {}

  ngOnInit() {
    this.loadArticles();

    this.store.select(ArticlesState.isThatArticlesLoad).subscribe((res) => {
      console.log("is article load", res);
      this.articleLoadedStatus = res;
    });
  }

  loadArticles() {
    this.store.dispatch(new GetAllArticles()).subscribe((res) => {
      console.log("****** this is comming from article", res);
    });
  }

  updateArticle(article) {
    let updateData: IArticle = {
      id: article.id,
      createdAt: article.createdAt,
      title: "Programming with Raheem",
      description:
        "Programming with raheem is really super, i enjoyed lot programing with him, he is really super more technical sound guy, awesome",
    };

    this.store.dispatch(new UpdateArticle(updateData));
  }

  deleteArticle(payload) {
    this.store.dispatch(new DeleteArticle(payload));
  }
}
