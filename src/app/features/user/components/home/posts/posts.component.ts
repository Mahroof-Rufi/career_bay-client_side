import { Component, OnDestroy, OnInit, Output } from '@angular/core';
import { Post, User, userStateModel } from '../../../user-store/user.model';
import { Store } from '@ngrx/store';
import { getPosts, getUserData, getUserId } from '../../../user-store/user.selector';
import { ActivatedRoute } from '@angular/router';
import { PostsApiServiceService } from '../../../../../shared/services/posts-api-service.service';
import { loadPostsSuccess, triggerPostLike, triggerPostSave } from '../../../user-store/user.actions';
import { Observable, Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TuiAlertService } from '@taiga-ui/core';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss'
})
export class PostsComponent implements OnInit, OnDestroy{
  @Output() currentPageNo:number = 1;
  @Output() maxItemPerPage:number = 5;
  @Output() totalNoOfPosts!:number;

  posts$:Observable<Post[]> = this._userStore.select(getPosts);

  user_id!:string;
  post_Id!:string;
  employer_id!:string;
  userData$:Observable<User> = this._userStore.select(getUserData) 
  commentsModal:boolean = false
  isLoading:boolean = false

  private _queryParamsSubscription!:Subscription;
  private _postAPIsSubscription!:Subscription;
  private _userStoreSubscription!:Subscription;
  commentForm!: FormGroup;
  comments!:any[]

  constructor(
    private readonly _userStore:Store<{ 'user':userStateModel }>,
    private readonly _postsAPIs:PostsApiServiceService,
    private readonly _activatedRoute:ActivatedRoute,
    private readonly _formBuilder:FormBuilder,
    private readonly _alert:TuiAlertService,
  ) {}

  ngOnInit(): void {    
    this._queryParamsSubscription = this._activatedRoute.queryParamMap.subscribe({
      next: queries => {
        const query = queries.get('page')
        if (query) {
          this.currentPageNo = parseInt(query)
        }
        
        this._postAPIsSubscription = this._postsAPIs.loadPosts(this.currentPageNo || 1).subscribe({          
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
    this._userStoreSubscription = this._userStore.select(getUserId).subscribe( id => this.user_id = id) 
    this.commentForm = this._formBuilder.group({
      newComment: ['', Validators.required]
    }); 
  }

  ngOnDestroy(): void {
    this._queryParamsSubscription?.unsubscribe()
    this._postAPIsSubscription?.unsubscribe()
    this._userStoreSubscription?.unsubscribe()
  }

}
