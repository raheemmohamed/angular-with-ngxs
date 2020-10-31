import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ArticlesRoutingModule } from "./articles-routing.module";
import { ArticlesListComponent } from "./component/articles-list/articles-list.component";
import { ArticlesCreateComponent } from "./component/articles-create/articles-create.component";
import { ArticleComponent } from "./layout/article/article.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    ArticlesListComponent,
    ArticlesCreateComponent,
    ArticleComponent,
  ],
  imports: [
    CommonModule,
    ArticlesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class ArticlesModule {}
