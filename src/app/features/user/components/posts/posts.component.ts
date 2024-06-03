import { Component, OnInit, Output } from '@angular/core';
import { Post, userStateModel } from '../../user-store/user.model';
import { Store } from '@ngrx/store';
import { getPosts, getUserId } from '../../user-store/user.selector';
import { ActivatedRoute } from '@angular/router';
import { PostsApiServiceService } from '../../../../shared/services/posts-api-service.service';
import { loadPostsSuccess, triggerPostLike } from '../../user-store/user.actions';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss'
})
export class PostsComponent implements OnInit{
  @Output() currentPageNo:number = 1;
  @Output() maxItemPerPage:number = 5;
  @Output() totalNoOfPosts!:number;
  @Output() posts!:any[];

  user_id!:string;

  constructor(
    private readonly _userStore:Store<{ 'user':userStateModel }>,
    private readonly _postsAPIs:PostsApiServiceService,
    private readonly _activatedRoute:ActivatedRoute
  ) {}

  ngOnInit(): void {    
    this._activatedRoute.queryParamMap.subscribe({
      next: queries => {
        const query = queries.get('page')
        if (query) {
          this.currentPageNo = parseInt(query)
        }
        
        this._postsAPIs.loadPosts(this.currentPageNo || 1).subscribe({          
          next: response  => {
            console.log(response);
            this._userStore.dispatch(loadPostsSuccess({ posts:response.posts }))
            this.totalNoOfPosts = response.totalNoOfPosts
          },
    
          error: err => {
    
          }
        })
      }
    })
    this._userStore.select(getUserId).subscribe( id => this.user_id = id)
    this._userStore.select(getPosts).subscribe( data => {
      this.posts = data
      console.log(this.posts);
      
    })    
  }

  likeTrigger(employerId:string,post_id:any) {  
    this._userStore.dispatch(triggerPostLike({ employer_id:employerId, post_id:post_id }))
  }

}
