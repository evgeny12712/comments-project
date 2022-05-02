import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserSelectorComponent } from './components/user-selector/user-selector.component';
import { CommentsComponent } from './components/comments/comments.component';
import { HomeComponent } from './pages/home/home.component';
import { CommentPreviewComponent } from './components/comment-preview/comment-preview.component';
import { DateDescPipe } from './pipes/date-desc.pipe';
import { AddCommentComponent } from './components/add-comment/add-comment.component';

@NgModule({
  declarations: [
    AppComponent,
    UserSelectorComponent,
    CommentsComponent,
    HomeComponent,
    CommentPreviewComponent,
    DateDescPipe,
    AddCommentComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
