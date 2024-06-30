import { AfterViewInit, Component, OnDestroy, OnInit, Output } from '@angular/core';
import { AddPostModalService } from '../../../services/add-post-modal.service';
import { Store } from '@ngrx/store';
import { Employer, EmployerPosts, Post } from '../../../store/employer.model';
import { getPosts } from '../../../store/employer.selector';
import { initFlowbite } from 'flowbite';
import { loadEmployerPosts, loadEmployerPostsSuccess } from '../../../store/employer.actions';
import { ActivatedRoute } from '@angular/router';
import { PostsApiServiceService } from '../../../../../shared/services/posts-api-service.service';
import { AuthApiService } from '../../../../../services/auth-api-service.service';
import { FilterOptions } from '../../../../../models/filterOptions';
import { Subscription } from 'rxjs';
import { tuiIconMoreVertical } from '@taiga-ui/icons';

@Component({
  selector: 'app-company-posts-component',
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss'
})
export class CompanyPostsComponentComponent implements OnInit, AfterViewInit, OnDestroy{
  @Output() posts!:any
  @Output() totalPosts!:number;
  @Output() maxItemInPerPage:number = 5;
  @Output() pageNo:number = 1

  @Output() filterOptions: FilterOptions[] = [
    { label: 'sort by posted date', subOptions: [{ label: 'newest first', key: 'sort', value: 'newest' }, { label: 'oldest first', key: 'sort', value: 'oldest' }], type: 'Radio' },
  ]

  sort!:string;
  commentsModal:boolean = false
  comments:any[] = [] 

  private _queryParamMapSubscription!:Subscription;
  private _postAPIsSubscription!:Subscription;
  private _employerTokenRefreshedSubscription!:Subscription;
  private _employerStoreSubscription!:Subscription;
  readonly tuiIconMoreVertical = tuiIconMoreVertical;

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
        
        const queryParams: any = {};
        response.keys.forEach(key => {
          if (key == 'page') {
            this.pageNo = Number(response.get(key))
          }
          queryParams[key] = response.getAll(key);
        });
        
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
      console.log('initial jobs:', res);
          
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

  showComments(comments:any) {
    this.commentsModal = !this.commentsModal
    if (this.commentsModal) {
      this.comments = comments
    }
  }

  ngOnDestroy(): void {
    this._queryParamMapSubscription?.unsubscribe()
    this._postAPIsSubscription?.unsubscribe()
    this._employerStoreSubscription?.unsubscribe()
    this._employerTokenRefreshedSubscription?.unsubscribe()
  }
}
