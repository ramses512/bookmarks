export interface Bookmark {
  id: number;
  name: string;
  url: string;
  group: 'work' | 'leisure' | 'personal';
}
