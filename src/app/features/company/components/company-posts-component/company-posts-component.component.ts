import { AfterViewInit, Component, OnInit, Output } from '@angular/core';
import { AddPostModalService } from '../../services/add-post-modal.service';
import { Store } from '@ngrx/store';
import { Employer, EmployerPosts, Post } from '../../store/employer.model';
import { getPosts } from '../../store/employer.selector';
import { initFlowbite } from 'flowbite';
import { loadEmployerPosts, loadEmployerPostsSuccess } from '../../store/employer.actions';
import { ActivatedRoute } from '@angular/router';
import { PostsApiServiceService } from '../../../../shared/services/posts-api-service.service';
import { AuthApiService } from '../../../../services/auth-api-service.service';

@Component({
  selector: 'app-company-posts-component',
  templateUrl: './company-posts-component.component.html',
  styleUrl: './company-posts-component.component.scss'
})
export class CompanyPostsComponentComponent implements OnInit{
  @Output() posts!:any
  @Output() totalPosts!:number;
  @Output() maxItemInPerPage:number = 5;
  @Output() pageNo:number = 1

  constructor(
    private readonly _authService:AuthApiService,
    private readonly _addPostModal:AddPostModalService,
    private readonly _employerStore:Store<{ employer:Employer }>,
    private readonly _activatedRoute:ActivatedRoute,
    private readonly _postAPIs:PostsApiServiceService
  ) {}

  ngOnInit(): void {
    this._activatedRoute.queryParamMap.subscribe({
      next: response => {
        const query = response.get('page')
        if (query) {
          this.pageNo = parseInt(query)
        }

        this._postAPIs.fetchPosts(this.pageNo || 1).subscribe({
          next: (response:any) => {  
            console.log(response);
                
            this._employerStore.dispatch(loadEmployerPostsSuccess({ posts:response.posts }))
            this.totalPosts = response.totalNoOfPosts
          },
    
          error: err => {}
        })

        this._authService.$employerTokenRefreshed.subscribe({
          next: response => {
            this._postAPIs.fetchPosts(this.pageNo || 1).subscribe({
              next: (response:any) => { 
                this._employerStore.dispatch(loadEmployerPostsSuccess({ posts:response.posts }))
                this.totalPosts = response.totalNoOfPosts
              },
        
              error: err => {}
            })
          }
        })
      }
    })

    this._employerStore.select(getPosts).subscribe( res => {     
      this.posts = res;
    })
  }

  ngAfterViewInit(): void {
    initFlowbite();
  }

  trackByFn(id: string): string {
    return id; 
  } 

  addPost() {
    this._addPostModal.openAddPostDialogue()
  }

  editPost(post_id:string) {
    this._addPostModal.openEditPostDialogue(post_id)
  }

  deletePost(post_id:string) {
    this._addPostModal.openDeletePostConfirmation(post_id)
  }
}
