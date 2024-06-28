import { Component, OnDestroy, OnInit, Output } from '@angular/core';
import { Post, User, userStateModel } from '../../../user-store/user.model';
import { Store } from '@ngrx/store';
import { getPosts, getUserData, getUserId } from '../../../user-store/user.selector';
import { ActivatedRoute } from '@angular/router';
import { PostsApiServiceService } from '../../../../../shared/services/posts-api-service.service';
import { loadPostsSuccess, triggerPostLike } from '../../../user-store/user.actions';
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
  @Output() posts!:Post[];

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
    this._userStoreSubscription = this._userStore.select(getPosts).subscribe( data => {
      this.posts = data      
    })   
    this.commentForm = this._formBuilder.group({
      newComment: ['', Validators.required]
    }); 
  }

  likeTrigger(employerId:string,post_id:any) {  
    this._userStore.dispatch(triggerPostLike({ employer_id:employerId, post_id:post_id }))
  }

  showComments(comments:any, employer_id:string, post_Id:string) {    
    this.commentsModal = !this.commentsModal
    if (this.commentsModal) {
      this.comments = comments
      this.post_Id = post_Id
      this.employer_id = employer_id
    }
  }

  addComment() {
    if (this.commentForm.valid) {
      this.isLoading = true
      const comment = this.commentForm.get('newComment')?.value;
      this._postsAPIs.addComment(comment,this.employer_id,this.post_Id).subscribe({
        next: (res:any) => {
          this.isLoading = false
          this.commentForm.get('newComment')?.patchValue('')
          this.comments = [...this.comments,res.newComment]
        },
        error: err => {
          this.isLoading = false
          this._alert.open('', {
            label: err.error.message,
            status: 'error',
            autoClose: true,
            hasCloseButton: true
          }).subscribe() 
        }
      })
    }
  }

  ngOnDestroy(): void {
    this._queryParamsSubscription?.unsubscribe()
    this._postAPIsSubscription?.unsubscribe()
    this._userStoreSubscription?.unsubscribe()
  }

}
