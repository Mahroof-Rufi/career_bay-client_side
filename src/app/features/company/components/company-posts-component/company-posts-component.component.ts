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
import { FilterOptions } from '../../../../models/filterOptions';

@Component({
  selector: 'app-company-posts-component',
  templateUrl: './company-posts-component.component.html',
  styleUrl: './company-posts-component.component.scss'
})
export class CompanyPostsComponentComponent implements OnInit, AfterViewInit{
  @Output() posts!:any
  @Output() totalPosts!:number;
  @Output() maxItemInPerPage:number = 5;
  @Output() pageNo:number = 1

  @Output() filterOptions: FilterOptions[] = [
    { label: 'sort by posted date', subOptions: [{ label: 'newest first', key: 'sort', value: 'newest' }, { label: 'oldest first', key: 'sort', value: 'oldest' }], type: 'Radio' },
  ]

  sort!:string;

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
        console.log('nnnnnnn');
        
        const queryParams: any = {};
        response.keys.forEach(key => {
          if (key == 'page') {
            this.pageNo = Number(response.get(key))
          }
          queryParams[key] = response.getAll(key);
        });
        
        // if (query) {
        //   this.pageNo = parseInt(query)
        // }

        // if (sortQuery) {
        //   this.sort = sortQuery          
        // }
        const filterQueryString = this.constructQueryString(queryParams);

        this._postAPIs.fetchPosts(this.pageNo || 1, filterQueryString).subscribe({
          next: (response:any) => {                 
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

  private constructQueryString(params: { [key: string]: string[] }): string {
    const queryStrings = Object.keys(params).map(key => {
      return `${encodeURIComponent(key)}=${encodeURIComponent(params[key].join(','))}`;
    });
    return queryStrings.join('&');
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
