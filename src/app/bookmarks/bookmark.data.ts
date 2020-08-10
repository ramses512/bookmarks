import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Bookmark, Group } from './bookmark.interface';

export class BookmarkData implements InMemoryDbService {
  createDb(): any {
    const bookmarks: Bookmark[] = [
      {
        id: 1,
        name: 'Youtube',
        url: 'https://www.youtube.com/',
        group: Group.LEISURE,
      },
      {
        id: 2,
        name: 'Angular',
        url: 'https://angular.io/',
        group: Group.WORK,
      },
      {
        id: 3,
        name: 'Github',
        url: 'https://github.com/ramses512',
        group: Group.PERSONAL,
      },
      {
        id: 4,
        name: 'Twitter',
        url: 'https://twitter.com/',
        group: Group.LEISURE,
      },
    ];
    return { bookmarks };
  }
}
