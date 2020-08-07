import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Bookmark } from './bookmark.interface';

@Injectable({
  providedIn: 'root',
})
export class BookmarkService {
  private bookmarksUrl = 'api/bookmarks';

  constructor(private http: HttpClient) {}
  /**
   * Gets bookmarks
   * @returns bookmarks
   */
  getBookmarks(): Observable<Bookmark[]> {
    return this.http
      .get<Bookmark[]>(this.bookmarksUrl)
      .pipe(catchError(this.handleError));
  }
  /**
   * Adds bookmark
   * @param data
   * @returns bookmark
   */
  addBookmark(data: Bookmark): Observable<Bookmark> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    return this.http
      .post<Bookmark>(this.bookmarksUrl, data, { headers })
      .pipe(catchError(this.handleError));
  }
  /**
   * Removes bookmark
   * @param id
   * @returns bookmark
   */
  removeBookmark(id: number): Observable<Bookmark> {
    return this.http
      .delete<Bookmark>(`${this.bookmarksUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }
  /**
   * Handles error
   * @param err
   * @returns error
   */
  private handleError(err): Observable<never> {
    let errorMessage = `${err.status}: ${err.body.error}`;
    if (err.error instanceof ErrorEvent) {
      errorMessage = `Error: ${err.error.message}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }
}
