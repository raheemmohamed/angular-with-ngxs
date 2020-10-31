import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { UsersComponent } from "./layouts/users/users.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: "users",
    pathMatch: "full",
  },
  {
    path: "users",
    component: UsersComponent,
  },
  {
    path: "articles",
    loadChildren: () =>
      import("./articles/articles.module").then((m) => m.ArticlesModule),
  },
  {
    path: "**",
    component: UsersComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
