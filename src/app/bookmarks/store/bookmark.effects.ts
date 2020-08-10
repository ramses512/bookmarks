import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { Bookmark } from '../bookmark.interface';
import { BookmarkService } from '../bookmark.service';
import { SnackbarOpen } from '../snackbar/store/snackbar.action';
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
    mergeMap((response: Bookmark) => [
      new bookmarkActions.CreateSuccess(response.id),
      new SnackbarOpen({
        message: 'Bookmark Created',
        action: 'Success',
      }),
    ]),
    catchError((err) => [new bookmarkActions.CreateFail(err)])
  );
  @Effect()
  editBookmark$: Observable<Action> = this.actions$.pipe(
    ofType(bookmarkActions.BookmarksActionTypes.Edit),
    map((action: bookmarkActions.Edit) => action.payload),
    switchMap((newBookmark) => this.bookmarkService.editBookmark(newBookmark)),
    mergeMap((response: Bookmark) => [
      new bookmarkActions.EditSuccess(),
      new SnackbarOpen({
        message: 'Bookmark Edited',
        action: 'Success',
      }),
    ]),
    catchError((err) => [new bookmarkActions.EditFail(err)])
  );

  @Effect()
  removeBookmark$: Observable<Action> = this.actions$.pipe(
    ofType(bookmarkActions.BookmarksActionTypes.Delete),
    map((action: bookmarkActions.Delete) => action.payload),
    switchMap((id) => this.bookmarkService.removeBookmark(id)),
    mergeMap((bookmark: Bookmark) => [
      new bookmarkActions.DeleteSuccess(bookmark),
      new SnackbarOpen({
        message: 'Bookmark Deleted',
        action: 'Success',
      }),
    ]),
    catchError((err) => [new bookmarkActions.DeleteFail(err)])
  );
}
