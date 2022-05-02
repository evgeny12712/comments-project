import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { Comment } from '../models/comment';
import { StorageService } from './storage.service';
@Injectable({
  providedIn: 'root',
})
export class CommentService {
  constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) {}

  private users$ = this.http.get('/assets/data/users.json');
  private comments$ = this.http.get('/assets/data/comments.json');

  public getUsers() {
    return this.users$;
  }

  public getComments() {
    return this.comments$;
  }

  public removeComment(id: number) {
    let comments = this.storageService.load('comments');
    let comment = this.getCommentById(id, comments);
    if (!comment.parentCommentId) {
      const idx = comments.findIndex(
        (currComment: Comment) => currComment.id === id
      );

      comments.splice(idx, 1);
    } else {
      let parent = this.getCommentById(comment.parentCommentId, comments);
      const idx = parent.children.findIndex(
        (currComment: Comment) => currComment.id === id
      );
      parent.children.splice(idx, 1);
    }
    this.storageService.store('comments', comments);
  }

  public saveComment(comment: Comment, parentCommentId: number) {
    let comments = this.storageService.load('comments');
    let loggedInUser = this.storageService.load('loggedInUser');
    if (comment.id) {
      if (loggedInUser.id !== comment.ownerId) return;
      comment.createdAt = new Date().toLocaleString();
      if (!comment.parentCommentId) {
        const idx = comments.findIndex(
          (currComment) => currComment.id === comment.id
        );
        comments.splice(idx, 1, comment);
      } else {
        const parent = this.getCommentById(comment.parentCommentId, comments);
        const idx = parent.children.findIndex(
          (currComment) => currComment.id === comment.id
        );
        parent.children.splice(idx, 1, comment);
      }
    } else {
      comment.id = Math.floor(Math.random() * (1000 - 0 + 1) + 0);
      comment.createdAt = new Date().toLocaleString();
      comment.ownerId = loggedInUser.id;
      comment.parentCommentId = parentCommentId;
      if (!parentCommentId) {
        comments.push(comment);
      } else {
        const parent = this.getCommentById(parentCommentId, comments);
        if (!parent.children?.length) parent.children = [];
        parent.children.push(comment);
      }
    }
    this.storageService.store('comments', comments);
  }

  public loginUser(id: number) {
    const user = this.getUserById(id);
    this.storageService.store('loggedInUser', user);
  }

  public getLoggedInUser() {
    return this.storageService.load('loggedInUser');
  }

  public getEmptyComment() {
    return {
      id: null,
      parentCommentId: null,
      ownerId: null,
      txt: '',
      createdAt: '',
      deletedAt: null,
      children: [],
    };
  }

  public getUserById(id: number) {
    const users = this.storageService.load('users') || [];
    return users.find((user) => +id === user.id);
  }

  public getCommentById(id: number, comments: any) {
    if (comments.length == 0) return;
    return (
      comments.find((comment) => comment.id == id) ||
      this.getCommentById(
        id,
        comments.map((comment) => comment.children || []).flat()
      ) ||
      []
    );
  }

  // private _getParent(comment:Comment, id: number) {
  //   let res = []
  //   if(!comment) return
  //   if(comment.id === id) res =
  // }
}
