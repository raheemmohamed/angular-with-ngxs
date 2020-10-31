import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

import { NgxsModule } from "@ngxs/store";
import { environment } from "src/environments/environment";
import { CreateComponent } from "./components/create/create.component";
import { IndexComponent } from "./components/index/index.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { NgxsLoggerPluginModule } from "@ngxs/logger-plugin";
import { NgxsReduxDevtoolsPluginModule } from "@ngxs/devtools-plugin";
import { UserState } from "./store/state/user.state";
import { UsersComponent } from "./layouts/users/users.component";
import { ArticlesModule } from "./articles/articles.module";
import { ArticlesState } from "./articles/store/articles.state";
@NgModule({
  declarations: [AppComponent, CreateComponent, IndexComponent, UsersComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxsModule.forRoot([UserState, ArticlesState], {
      developmentMode: !environment.production,
    }),
    NgxsLoggerPluginModule.forRoot(),
    NgxsReduxDevtoolsPluginModule.forRoot({
      //disabled: environment.production,
    }),
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    ArticlesModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
