import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class ArticlesService {
  constructor(private http: HttpClient) {}

  loadAllArticles() {
    const url = environment.apiEndpointArticles + "/articles";
    return this.http.get(url);
  }

  addArticles(payload) {
    const url = environment.apiEndpointArticles + "/articles";
    return this.http.post(url, payload);
  }

  updateArticle(payload) {
    const url = environment.apiEndpointArticles + `/articles/${payload.id}`;
    return this.http.put(url, payload);
  }

  deleteArticle(payload) {
    const url = environment.apiEndpointArticles + `/articles/${payload.id}`;
    return this.http.delete(url);
  }
}
