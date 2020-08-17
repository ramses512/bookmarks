export interface Bookmark {
  id: number;
  name: string;
  url: string;
  group: Group;
}
export interface BookmarkTransform {
  groupName: string;
  value: string;
  isGroup: boolean;
  reduced: BookmarkTransform;
}
export enum Group {
  WORK = 'work',
  LEISURE = 'leisure',
  PERSONAL = 'personal',
}
