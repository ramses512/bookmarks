import { Action } from '@ngrx/store';
import { Bookmark } from '../bookmark.interface';

export enum BookmarksActionTypes {
  Load = '[Bookmarks] Load',
  LoadSuccess = '[Bookmarks] Load Success',
  LoadFail = '[Bookmarks] Load Fail',
  Create = '[Bookmarks] Create',
  CreateSuccess = '[Bookmarks] Create Success',
  CreateFail = '[Bookmarks] Create Fail',
  Edit = '[Bookmarks] Edit',
  EditSuccess = '[Bookmarks] Edit Success',
  EditFail = '[Bookmarks] Edit Fail',
  Delete = '[Bookmarks] Delete',
  DeleteSuccess = '[Bookmarks] Delete Success',
  DeleteFail = '[Bookmarks] Delete Fail',
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
export class Create implements Action {
  readonly type = BookmarksActionTypes.Create;
  constructor(public payload: Bookmark) {}
}

export class CreateSuccess implements Action {
  readonly type = BookmarksActionTypes.CreateSuccess;

  constructor(public payload: number) {}
}

export class CreateFail implements Action {
  readonly type = BookmarksActionTypes.CreateFail;

  constructor(public payload: string) {}
}
export class Edit implements Action {
  readonly type = BookmarksActionTypes.Edit;
  constructor(public payload: Bookmark) {}
}

export class EditSuccess implements Action {
  readonly type = BookmarksActionTypes.EditSuccess;
}

export class EditFail implements Action {
  readonly type = BookmarksActionTypes.EditFail;

  constructor(public payload: string) {}
}
export class Delete implements Action {
  readonly type = BookmarksActionTypes.Delete;
  constructor(public payload: number) {}
}

export class DeleteSuccess implements Action {
  readonly type = BookmarksActionTypes.DeleteSuccess;

  constructor(public payload: Bookmark) {}
}

export class DeleteFail implements Action {
  readonly type = BookmarksActionTypes.DeleteFail;

  constructor(public payload: string) {}
}

export type BookmarksActions =
  | Load
  | LoadSuccess
  | LoadFail
  | Create
  | CreateSuccess
  | CreateFail
  | Edit
  | EditSuccess
  | EditFail
  | Delete
  | DeleteSuccess
  | DeleteFail;
