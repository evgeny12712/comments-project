import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { CommentService } from 'src/app/services/comment-service.service';
import { Comment } from 'src/app/models/comment';
import { User } from 'src/app/models/user';
import { StorageService } from 'src/app/services/storage.service';
import { Subscription } from 'rxjs/internal/Subscription';
@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  @ViewChild('addComponentScrollto') elAddComponent: ElementRef;
  constructor(
    private commentService: CommentService,
    private storageService: StorageService
  ) {}

  public comments: Comment[] = [];
  public users: User[] = [];
  public loggedInUser: User;
  public emptyComment: Comment;
  private commentsSubscription: Subscription;
  private usersSubscription: Subscription;
  public saveToCommentId: number;
  public isFocusAddInput = false;
  public commentDisplayName: string;
  public onRemoveComment(id: number) {
    this.commentService.removeComment(id);
    this.comments = this.storageService.load('comments');
  }

  public onSaveComment(comment: Comment) {
    if (comment.txt === '') return;
    this.commentService.saveComment(comment, this.saveToCommentId);
    this.comments = this.storageService.load('comments');
    this.emptyComment = this.commentService.getEmptyComment();
  }

  public onLoginUser(id: number) {
    this.commentService.loginUser(id);
    this.loggedInUser = this.storageService.load('loggedInUser');
  }

  public addCommentBlured() {
    this.saveToCommentId = null;
    this.isFocusAddInput = false;
    this.commentDisplayName = '';
  }

  public onAddToComment(commentId: number) {
    this.saveToCommentId = commentId;
    const commentOwnerId = this.commentService.getCommentById(
      commentId,
      this.comments
    ).ownerId;
    this.commentDisplayName = this.users.find(
      (user) => user.id === commentOwnerId
    ).displayName;
    this.isFocusAddInput = true;
    this.elAddComponent.nativeElement.scrollIntoView();
  }

  private arrangeComments(comments: Comment[]) {
    comments.forEach((comment) => {
      if (comment.parentCommentId) {
        let parentComment = this.commentService.getCommentById(
          comment.parentCommentId,
          comments
        );
        if (!parentComment?.children) parentComment.children = [];
        parentComment.children.push(comment);
      }
    });
    this.removeCommentsWithParents(comments);
    return comments;
  }

  private removeCommentsWithParents(comments: Comment[]) {
    for (let i = 0; i < comments.length; i++) {
      if (comments[i].parentCommentId) {
        comments.splice(i, 1);
        i--;
      }
    }
  }

  public goUp() {
    scrollTo(0, 0);
  }

  ngOnInit(): void {
    this.comments = this.storageService.load('comments');
    this.users = this.storageService.load('users');
    this.emptyComment = this.commentService.getEmptyComment();
    this.loggedInUser = this.storageService.load('loggedInUser');
    if (!this.users || !this.users.length) {
      this.usersSubscription = this.commentService
        .getUsers()
        .subscribe((users) => {
          console.log('loading users....');
          this.users = users as User[];
          this.storageService.store('users', this.users);
          if (!this.loggedInUser) {
            this.loggedInUser = this.users[0];
            this.storageService.store('loggedInUser', this.loggedInUser);
          }
        });
    }
    if (!this.comments || !this.comments.length) {
      this.commentsSubscription = this.commentService
        .getComments()
        .subscribe((comments) => {
          console.log('loading comments....');
          this.comments = comments as Comment[];
          this.comments = this.comments.sort((a, b) => {
            let firstDate: any = new Date(a.createdAt);
            let secondDate: any = new Date(b.createdAt);
            return secondDate - firstDate;
          });
          this.comments = this.arrangeComments(this.comments);
          this.storageService.store('comments', this.comments);
        });
    }
  }

  ngOnDestroy(): void {
    this.commentsSubscription.unsubscribe();
    this.usersSubscription.unsubscribe();
  }
}
