import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import { delay, map, tap } from 'rxjs/operators';
import {
  SnackbarActionTypes, SnackbarClose,
  SnackbarOpen
} from './snackbar.action';

@Injectable()
export class SnackbarEffects {
  constructor(private actions$: Actions, private matSnackBar: MatSnackBar) {}

  @Effect({
    dispatch: false,
  })
  closeSnackbar$: Observable<Action> = this.actions$.pipe(
    ofType(SnackbarActionTypes.SnackbarClose),
    tap(() => this.matSnackBar.dismiss())
  );

  @Effect()
  showSnackbar$: Observable<Action> = this.actions$.pipe(
    ofType<SnackbarOpen>(SnackbarActionTypes.SnackbarOpen),
    map((action: SnackbarOpen) => action.payload),
    tap((payload) =>
      this.matSnackBar.open(payload.message, payload.action, payload.config)
    ),
    delay(2000),
    map(() => new SnackbarClose())
  );
}
