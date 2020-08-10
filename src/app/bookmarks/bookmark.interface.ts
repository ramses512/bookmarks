export interface Bookmark {
  id: number;
  name: string;
  url: string;
  group: Group;
}
export enum Group {
  WORK = 'work',
  LEISURE = 'leisure',
  PERSONAL = 'personal',
}
