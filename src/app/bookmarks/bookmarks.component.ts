import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AddDialogComponent } from './add-dialog/add-dialog.component';
import { Bookmark } from './bookmark.interface';
import * as bookmarkActions from './store/bookmark.action';
import { getBookmarks } from './store/bookmark.selectors';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.scss'],
})
export class BookmarksComponent implements OnInit {
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  bookmarks$: Observable<Bookmark[]>;
  displayedColumns: string[];
  dataSource: any = [];
  reducedGroups = [];
  initialData: Bookmark[];

  constructor(private store: Store, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.store.dispatch(new bookmarkActions.Load());
    this.bookmarks$ = this.store.pipe(select(getBookmarks));
    this.bookmarks$.subscribe((data) => {
      this.initialData = data;
      this.displayedColumns = ['name', 'url', 'actions'];
      this.buildDataSource();
    });
  }
  openDialog(): void {
    this.dialog
      .open(AddDialogComponent, { width: '400px' })
      .afterClosed()
      .subscribe((data) => {
        if (data) {
          this.store.dispatch(new bookmarkActions.Create(data));
        }
      });
  }
  remove(data: Bookmark): void {
    this.store.dispatch(new bookmarkActions.Delete(data.id));
  }

  /**
   * Builds data source
   */
  private buildDataSource(): void {
    this.dataSource = new MatTableDataSource(
      this.groupBy('group', this.initialData, this.reducedGroups)
    );
    this.dataSource.sort = this.sort;
  }

  /**
   * Groups by
   * @param column
   * @param data
   * @param [reducedGroups]
   * @returns Array
   */
  private groupBy(column: string, data: any[], reducedGroups?: any[]): [] {
    const collapsedGroups = reducedGroups;
    const groups = data.reduce(this.customReducer(column, collapsedGroups), {});
    const groupArray = Object.keys(groups).map((key) => groups[key]);
    const flatList = groupArray.reduce((a, c) => a.concat(c), []);

    return flatList.filter(
      (rawLine) =>
        rawLine.isGroup ||
        collapsedGroups.every((group) => rawLine[column] !== group.value)
    );
  }
  /**
   * Customs reducer
   * @param column
   * @param [collapsedGroups]
   * @returns reducer
   */
  private customReducer(column: string, collapsedGroups?: any[]): any {
    return (accumulator, currentValue) => {
      const currentGroup = currentValue[column];
      if (!accumulator[currentGroup]) {
        accumulator[currentGroup] = [
          {
            groupName: currentValue[column],
            value: currentValue[column],
            isGroup: true,
            reduced: collapsedGroups.some(
              (group) => group.value === currentValue[column]
            ),
          },
        ];
      }

      accumulator[currentGroup].push(currentValue);

      return accumulator;
    };
  }

  /**
   * Determines whether group is
   * @param index
   * @param item
   * @returns true if group
   */
  isGroup(index, item): boolean {
    return item.isGroup;
  }

  /**
   * Reduces group
   * @param row
   */
  reduceGroup(row): void {
    row.reduced = !row.reduced;
    if (row.reduced) {
      this.reducedGroups.push(row);
    } else {
      this.reducedGroups = this.reducedGroups.filter(
        (el) => el.value !== row.value
      );
    }

    this.buildDataSource();
  }
}
