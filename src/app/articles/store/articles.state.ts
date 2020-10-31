import { state } from "@angular/animations";
import { Router } from "@angular/router";
import { State, Action, Selector, StateContext } from "@ngxs/store";
import { patch, removeItem, updateItem } from "@ngxs/store/operators";
import { retry, tap } from "rxjs/operators";
import { ArticlesService } from "../services/articles.service";
import { IArticle } from "./articles-model";
import {
  AddArticle,
  DeleteArticle,
  GetAllArticles,
  UpdateArticle,
} from "./articles.actions";

export interface ArticlesStateModel {
  articles: IArticle[];
  isArticlesLoad: boolean;
}

@State<ArticlesStateModel>({
  name: "articles",
  defaults: {
    articles: [],
    isArticlesLoad: false,
  },
})
export class ArticlesState {
  constructor(
    private articleService: ArticlesService,
    private router: Router
  ) {}

  @Selector()
  public static getArticles(state: ArticlesStateModel) {
    return state.articles;
  }

  @Selector()
  static isThatArticlesLoad(state: ArticlesStateModel) {
    return state.isArticlesLoad;
  }

  @Action(GetAllArticles)
  fetchArticles(ctx: StateContext<ArticlesStateModel>) {
    return this.articleService.loadAllArticles().pipe(
      retry(1),
      tap((res: IArticle[]) => {
        const state = ctx.getState();
        ctx.patchState({
          ...state,
          articles: res,
          isArticlesLoad: true,
        });
      })
    );
  }

  @Action(AddArticle) addArticle(
    ctx: StateContext<ArticlesStateModel>,
    { payload }: AddArticle
  ) {
    return this.articleService.addArticles(payload).pipe(
      tap((res: any) => {
        const state = ctx.getState();

        ctx.patchState({
          ...state,
          articles: [...state.articles, res],
        });
        console.log("new record add", res);
      })
    );
  }

  @Action(UpdateArticle) updateArticles(
    ctx: StateContext<ArticlesStateModel>,
    { payload }: UpdateArticle
  ) {
    return this.articleService.updateArticle(payload).pipe(
      tap((res: any) => {
        const state = ctx.getState();

        ctx.setState(
          patch({
            ...state,
            articles: updateItem<IArticle>(
              (articles) => articles.id == payload.id,
              res
            ),
          })
        );
        console.log("updated record add", res);
      })
    );
  }

  @Action(DeleteArticle) deleteArticle(
    ctx: StateContext<ArticlesStateModel>,
    { payload }: DeleteArticle
  ) {
    return this.articleService.deleteArticle(payload).pipe(
      tap((res: any) => {
        const state = ctx.getState();

        ctx.setState(
          patch({
            ...state,
            articles: removeItem<IArticle>(
              (article) => article.id === payload.id
            ),
          })
        );
        console.log("updated record add", res);
      })
    );
  }
}
