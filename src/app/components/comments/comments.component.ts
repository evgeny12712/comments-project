import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommentService } from 'src/app/services/comment-service.service';
import { Comment } from 'src/app/models/comment';
import { User } from 'src/app/models/user';
@Component({
  selector: 'comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
})
export class CommentsComponent implements OnInit {
  constructor(private commentService: CommentService) {}
  @Input() comments: Comment[];
  @Input() loggedInUser: User;
  @Output() onRemove = new EventEmitter<number>();
  @Output() onSave = new EventEmitter<Comment>();
  @Output() onAddComment = new EventEmitter<number>();
  ngOnInit(): void {}
}
