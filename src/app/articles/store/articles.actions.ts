import { IArticle } from "./articles-model";

export enum ACTION_TYPE {
  ADD_ARTICLES = "[Articles] Add articles",
  UPDATE_ARTICLES = "[Articles] Update articles",
  GET_ALL_ARTICLES = "[Articles] Get all articles",
  DELETE_ARTICLES = "[Articles] Delete articles",
}

export class AddArticle {
  public static readonly type = ACTION_TYPE.ADD_ARTICLES;
  constructor(public payload: IArticle) {}
}

export class UpdateArticle {
  public static readonly type = ACTION_TYPE.UPDATE_ARTICLES;
  constructor(public payload: IArticle) {}
}

export class GetAllArticles {
  public static readonly type = ACTION_TYPE.GET_ALL_ARTICLES;
}

export class DeleteArticle {
  public static readonly type = ACTION_TYPE.DELETE_ARTICLES;
  constructor(public payload: IArticle) {}
}
