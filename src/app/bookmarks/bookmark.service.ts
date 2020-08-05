import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Bookmark } from './bookmark.interface';

@Injectable({
  providedIn: 'root',
})
export class BookmarkService {
  private bookmarksUrl = 'api/bookmarks';

  constructor(private http: HttpClient) {}

  getBookmarks(): Observable<Bookmark[]> {
    return this.http
      .get<Bookmark[]>(this.bookmarksUrl)
      .pipe(catchError(this.handleError));
  }

  private handleError(err): Observable<never> {
    let errorMessage = `${err.status}: ${err.body.error}`;
    if (err.error instanceof ErrorEvent) {
      errorMessage = `Error: ${err.error.message}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }
}
