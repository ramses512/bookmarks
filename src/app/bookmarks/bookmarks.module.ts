import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AddDialogComponent } from './add-dialog/add-dialog.component';
import { bookmarkRoutes } from './bookmark.routing.module';
import { BookmarksComponent } from './bookmarks.component';
import { SnackbarEffects } from './snackbar/store/snackbar.effects';
import { BookmarkEffects } from './store/bookmark.effects';
import { reducer } from './store/bookmark.reducer';

@NgModule({
  declarations: [BookmarksComponent, AddDialogComponent],
  imports: [
    CommonModule,
    MatTableModule,
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSortModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild(bookmarkRoutes),
    StoreModule.forFeature('bookmarks', reducer),
    EffectsModule.forFeature([BookmarkEffects, SnackbarEffects]),
  ],
  entryComponents: [AddDialogComponent],
})
export class BookmarksModule {}
