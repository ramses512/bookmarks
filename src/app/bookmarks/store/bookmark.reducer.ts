import { BookmarkState } from './bookmark-state.interface';
import { BookmarksActions, BookmarksActionTypes } from './bookmark.action';

export const initialState: BookmarkState = {
  bookmarks: [],
  selected: null,
  action: null,
  done: false,
  error: null,
};

export function reducer(
  state = initialState,
  action: BookmarksActions
): BookmarkState {
  switch (action.type) {
    case BookmarksActionTypes.LoadSuccess:
      return {
        ...state,
        bookmarks: action.payload,
        done: true,
        selected: null,
        error: null,
      };

    case BookmarksActionTypes.LoadFail:
      return {
        ...state,
        done: true,
        selected: null,
        error: action.payload,
      };
    case BookmarksActionTypes.Create:
      return {
        ...state,
        selected: action.payload,
        action: BookmarksActionTypes.Create,
        done: false,
        error: null,
      };
    case BookmarksActionTypes.CreateSuccess:
      const newBookmark = {
        ...state.selected,
        id: action.payload,
      };
      const bookmarks = [...state.bookmarks, newBookmark];
      return {
        ...state,
        bookmarks,
        selected: null,
        error: null,
        done: true,
      };

    case BookmarksActionTypes.CreateFail:
      return {
        ...state,
        selected: null,
        done: true,
        error: action.payload,
      };
    case BookmarksActionTypes.Edit:
      return {
        ...state,
        selected: action.payload,
        action: BookmarksActionTypes.Edit,
        done: false,
        error: null,
      };
    case BookmarksActionTypes.EditSuccess: {
      const index = state.bookmarks.findIndex(
        (el) => el.id === state.selected.id
      );
      if (index >= 0) {
        const bookmarks = [
          ...state.bookmarks.slice(0, index),
          state.selected,
          ...state.bookmarks.slice(index + 1),
        ];
        return {
          ...state,
          bookmarks,
          done: true,
          selected: null,
          error: null,
        };
      }
      return state;
    }

    case BookmarksActionTypes.EditFail:
      return {
        ...state,
        selected: null,
        done: true,
        error: action.payload,
      };
    case BookmarksActionTypes.Delete: {
      const selected = state.bookmarks.find((h) => h.id === action.payload);
      return {
        ...state,
        selected,
        action: BookmarksActionTypes.Delete,
        done: false,
        error: null,
      };
    }
    case BookmarksActionTypes.DeleteSuccess:
      return {
        ...state,
        bookmarks: state.bookmarks.filter((h) => h.id !== state.selected.id),
        selected: null,
        error: null,
        done: true,
      };

    case BookmarksActionTypes.DeleteFail:
      return {
        ...state,
        selected: null,
        done: true,
        error: action.payload,
      };

    default:
      return state;
  }
}
