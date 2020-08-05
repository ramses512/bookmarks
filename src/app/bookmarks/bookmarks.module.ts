import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { reducer } from './state/bookmark.reducer';
import { EffectsModule } from '@ngrx/effects';
import { BookmarkEffects } from './state/bookmark.effects';
import { BookmarksComponent } from './bookmarks.component';
import { RouterModule } from '@angular/router';
import { bookmarkRoutes } from './bookmark.routing.module';

@NgModule({
  declarations: [BookmarksComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(bookmarkRoutes),
    StoreModule.forFeature('bookmarks', reducer),
    EffectsModule.forFeature([BookmarkEffects]),
  ],
})
export class BookmarksModule {}
