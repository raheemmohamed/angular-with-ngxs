import { TestBed, async } from "@angular/core/testing";
import { NgxsModule, Store } from "@ngxs/store";
import { ArticlesState, ArticlesStateModel } from "./articles.state";

describe("Articles store", () => {
  let store: Store;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([ArticlesState])],
    }).compileComponents();
    store = TestBed.get(Store);
  }));

  it("should create an action and add an item", () => {});
});
