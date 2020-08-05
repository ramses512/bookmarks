import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Bookmark } from './bookmark.interface';

export class BookmarkData implements InMemoryDbService {

  createDb(): any {
    const bookmarks: any = [
      {
        id: 1,
        name: 'Youtube',
        url: 'https://www.youtube.com/',
        group: 'leisure'
      },
      {
        id: 2,
        name: 'Angular',
        url: 'https://angular.io/',
        group: 'work'
      },
      {
        id: 3,
        name: 'Github',
        url: 'https://github.com/ramses512',
        group: 'personal'
      },
    ];
    return { bookmarks };
  }
}
