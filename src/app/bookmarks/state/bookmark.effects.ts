import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { mergeMap, map, catchError, switchMap } from 'rxjs/operators';

import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as bookmarkActions from './bookmark.action';
import { BookmarkService } from '../bookmark.service';
import { Bookmark } from '../bookmark.interface';

@Injectable()
export class BookmarkEffects {
  constructor(
    private bookmarkService: BookmarkService,
    private actions$: Actions
  ) {}

  @Effect()
  loadBookmarks$: Observable<Action> = this.actions$.pipe(
    ofType(bookmarkActions.BookmarksActionTypes.Load),
    mergeMap((action) => {
      return this.bookmarkService.getBookmarks().pipe(
        map((bookmarks) => new bookmarkActions.LoadSuccess(bookmarks)),
        catchError((err) => of(new bookmarkActions.LoadFail(err)))
      );
    })
  );
  @Effect()
  createBookmark$: Observable<Action> = this.actions$.pipe(
    ofType(bookmarkActions.BookmarksActionTypes.Create),
    map((action: bookmarkActions.Create) => action.payload),
    switchMap((newBookmark) => this.bookmarkService.addBookmark(newBookmark)),
    map((response: Bookmark) => new bookmarkActions.CreateSuccess(response.id)),
    catchError((err) => [new bookmarkActions.CreateFail(err)])
  );

  @Effect()
  removeBookmark$: Observable<Action> = this.actions$.pipe(
    ofType(bookmarkActions.BookmarksActionTypes.Delete),
    map((action: bookmarkActions.Delete) => action.payload),
    switchMap((id) => this.bookmarkService.removeBookmark(id)),
    map((bookmark: Bookmark) => new bookmarkActions.DeleteSuccess(bookmark)),
    catchError((err) => [new bookmarkActions.DeleteFail(err)])
  );
}
