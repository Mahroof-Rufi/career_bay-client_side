import { Component, OnInit } from '@angular/core';
import { Post, userStateModel } from '../../user-store/user.model';
import { Store } from '@ngrx/store';
import { getPosts } from '../../user-store/user.selector';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss'
})
export class PostsComponent implements OnInit{

  posts!:any[]

  constructor(
    private readonly _userStore:Store<{ 'user':userStateModel }>
  ) {}

  ngOnInit(): void {
    this._userStore.select(getPosts).subscribe( data => this.posts = data)
  }

}
