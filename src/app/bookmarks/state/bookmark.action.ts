import { Action } from '@ngrx/store';
import { Bookmark } from '../bookmark.interface';

export enum BookmarksActionTypes {
  Load = '[Bookmarks] Load',
  LoadSuccess = '[Bookmarks] Load Success',
  LoadFail = '[Bookmarks] Load Fail',
}

export class Load implements Action {
  readonly type = BookmarksActionTypes.Load;
}

export class LoadSuccess implements Action {
  readonly type = BookmarksActionTypes.LoadSuccess;

  constructor(public payload: Bookmark[]) {}
}

export class LoadFail implements Action {
  readonly type = BookmarksActionTypes.LoadFail;

  constructor(public payload: string) {}
}

export type BookmarksActions = Load | LoadSuccess | LoadFail;
