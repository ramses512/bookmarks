import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { reducer } from './store/bookmark.reducer';
import { EffectsModule } from '@ngrx/effects';
import { BookmarkEffects } from './store/bookmark.effects';
import { BookmarksComponent } from './bookmarks.component';
import { AddDialogComponent } from './add-dialog/add-dialog.component';
import { RouterModule } from '@angular/router';
import { bookmarkRoutes } from './bookmark.routing.module';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

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
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild(bookmarkRoutes),
    StoreModule.forFeature('bookmarks', reducer),
    EffectsModule.forFeature([BookmarkEffects]),
  ],
  entryComponents: [AddDialogComponent],
})
export class BookmarksModule {}
