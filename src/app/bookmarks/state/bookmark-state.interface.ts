import { Bookmark } from '../bookmark.interface';

export interface BookmarkState {
  bookmarks: Bookmark[];
  selected: Bookmark;
  action: string;
  done: boolean;
  error?: string;
}
