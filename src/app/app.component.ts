import { Component } from '@angular/core';
import { UserSelectorComponent } from './components/user-selector/user-selector.component';
import { CommentsComponent } from './components/comments/comments.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'comments-proj';
}
