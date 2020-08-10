import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { Bookmark } from '../bookmark.interface';
import { BookmarkService } from '../bookmark.service';
import * as bookmarkActions from './bookmark.action';



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
