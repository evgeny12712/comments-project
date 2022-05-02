import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  OnChanges,
} from '@angular/core';
import { CommentService } from 'src/app/services/comment-service.service';
import { User } from 'src/app/models/user';
@Component({
  selector: 'user-selector',
  templateUrl: './user-selector.component.html',
  styleUrls: ['./user-selector.component.scss'],
})
export class UserSelectorComponent implements OnInit, OnChanges {
  constructor() {}
  @Input() users: User[];
  @Input() user: User;
  @Output() loginUser = new EventEmitter();
  loggedInUserId: number;

  public logUser({ target }) {
    this.loggedInUserId = target.value;
    this.loginUser.emit(this.loggedInUserId);
  }

  ngOnInit(): void {
    this.loggedInUserId = this.user?.id;
  }

  ngOnChanges(): void {
    if (this.user) this.loggedInUserId = this.user.id;
  }
}
