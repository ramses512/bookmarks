import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { mergeMap, map, catchError } from 'rxjs/operators';

import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as bookmarkActions from './bookmark.action';
import { BookmarkService } from '../bookmark.service';

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
      console.log(action);
      return this.bookmarkService.getBookmarks().pipe(
        map((bookmarks) => new bookmarkActions.LoadSuccess(bookmarks)),
        catchError((err) => of(new bookmarkActions.LoadFail(err)))
      );
    })
  );
}
