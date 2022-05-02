import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
import { Comment } from 'src/app/models/comment';
import { User } from 'src/app/models/user';
import { CommentService } from 'src/app/services/comment-service.service';

@Component({
  selector: 'comment-preview',
  templateUrl: './comment-preview.component.html',
  styleUrls: ['./comment-preview.component.scss'],
})
export class CommentPreviewComponent implements OnInit {
  @Input() comment: Comment;
  @Input() comments: Comment[];
  @Input() isMainComment: boolean;
  @Input() loggedInUser: User;
  @Output() onRemove = new EventEmitter<number>();
  @Output() onSaveComment = new EventEmitter<Comment>();
  @Output() addComment = new EventEmitter<number>();

  user: User;
  commentCopy: Comment;
  public childComments: Comment[];
  constructor(private commentService: CommentService) {}
  isEdit = false;
  imagePath: string;
  public onRemoveComment() {
    this.onRemove.emit(this.comment.id);
  }

  public onEditComment() {
    this.isEdit = !this.isEdit;
  }

  public onAddComment() {
    this.addComment.emit(this.comment.id);
  }

  public saveComment() {
    this.onSaveComment.emit(this.commentCopy);
    this.isEdit = !this.isEdit;
    this.commentCopy.txt = '';
  }

  ngOnInit(): void {
    this.childComments = this.comments.filter(
      (comment) => comment.parentCommentId === this.comment.id
    );
    this.user = this.commentService.getUserById(this.comment.ownerId);
    this.commentCopy = JSON.parse(JSON.stringify(this.comment));
    this.imagePath = `/assets/users-imgs/${this.comment.ownerId}.jpg`;
  }
}
