import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  OnChanges,
  Output,
  ViewChild,
  SimpleChanges,
} from '@angular/core';
import { Comment } from 'src/app/models/comment';
import { User } from 'src/app/models/user';
@Component({
  selector: 'add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.scss'],
})
export class AddCommentComponent implements OnInit, OnChanges {
  @ViewChild('addTextarea') elAddTextarea: ElementRef;
  @Input() emptyComment: Comment;
  @Input() loggedInUser: User;
  @Input() isFocusAddInput: boolean;
  @Input() commentDisplayName: string;
  @Output() blured = new EventEmitter();
  @Output() onSaveComment = new EventEmitter<Comment>();
  comment: Comment;
  imagePath: string;
  constructor() {}

  public saveComment() {
    this.onSaveComment.emit(this.emptyComment);
    this.blured.emit();
    this.emptyComment.txt = '';
  }

  ngOnInit(): void {
    if (this.isFocusAddInput) {
      this.elAddTextarea.nativeElement.focus();
    }
    if (this.loggedInUser) {
      this.imagePath = `/assets/users-imgs/${this.loggedInUser?.id}.jpg`;
    } else {
      this.imagePath = `/assets/users-imgs/1.jpg`;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.isFocusAddInput) {
      this.elAddTextarea.nativeElement.focus();
    }
    this.imagePath = `/assets/users-imgs/${this.loggedInUser?.id}.jpg`;
  }
}
