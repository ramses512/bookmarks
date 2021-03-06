import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BookmarkState } from './bookmark-state.interface';

const getBookmarkFeatureState = createFeatureSelector<BookmarkState>(
  'bookmarks'
);

export const getBookmarks = createSelector(getBookmarkFeatureState, (state) => {
  return state.bookmarks;
});
