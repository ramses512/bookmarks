
import { BookmarkState } from './bookmark-state.interface';
import { BookmarksActions, BookmarksActionTypes } from './bookmark.action';

export const initialState: BookmarkState = { bookmarks: [] };

export function reducer(state = initialState, action: BookmarksActions): BookmarkState {

  switch (action.type) {
    case BookmarksActionTypes.LoadSuccess:
      return {
        ...state,
        bookmarks: action.payload,
      };

    case BookmarksActionTypes.LoadFail:
      return {
        ...state,
        bookmarks: []
      };

    default:
      return state;
  }
}
