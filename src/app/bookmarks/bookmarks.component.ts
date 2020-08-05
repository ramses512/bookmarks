import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BookmarkState } from './state/bookmark-state.interface';
import { Store, select } from '@ngrx/store';
import * as bookmarkActions from './state/bookmark.action';
import { getBookmarks } from './state/bookmark.selectors';
import { Bookmark } from './bookmark.interface';
@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.scss'],
})
export class BookmarksComponent implements OnInit {
  bookmarks$: Observable<Bookmark[]>;

  constructor(private store: Store<BookmarkState>) {}

  ngOnInit(): void {
    this.store.dispatch(new bookmarkActions.Load());
    this.bookmarks$ = this.store.pipe(select(getBookmarks));
    this.bookmarks$.subscribe((test) => {
      console.log(test);
    });
  }
}
