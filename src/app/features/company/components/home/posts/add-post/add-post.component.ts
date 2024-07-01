import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AddPostModalService } from '../../../../services/add-post-modal.service';
import { Store } from '@ngrx/store';
import { Employer } from '../../../../../admin/store/admin.model';
import { PostsApiServiceService } from '../../../../../../shared/services/posts-api-service.service';
import { TuiAlertService, TuiDialogContext } from '@taiga-ui/core';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
import { addPostSuccess, deletePostSuccess, loadEmployerPostsSuccess } from '../../../../store/employer.actions';
import { getPostById } from '../../../../store/employer.selector';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrl: './add-post.component.scss'
})
export class AddPostComponent implements OnInit, OnDestroy{

  descriptionControl!:FormControl;
  imageFiles: File[] = [];
  oldImageUrls: string[] = [];
  newImageUrls: string[] = [];
  messageType!: string;
  post_id!:string;

  postDescription!:string;
  isLoading:boolean = false

  private _employerStoreSubscription!:Subscription;
  private _postAPIsSubscription!:Subscription;
  private _alertSubscription!:Subscription;

  constructor(
    @Inject(POLYMORPHEUS_CONTEXT)
    private readonly _context: TuiDialogContext<string, string>,
    private readonly _postsAPIS:PostsApiServiceService,
    private readonly _addPostModal:AddPostModalService,
    private readonly _alert:TuiAlertService,
    private readonly _employerStore:Store<{ employer:Employer }>
  ) {}

  ngOnInit(): void {
    const data:any = this.data
    this.messageType = data?.messageType
    this.post_id = data.post_id
    if (this.messageType == 'editPost') {
      this._employerStoreSubscription = this._employerStore.select(getPostById(this.post_id)).subscribe({
        next: (response:any) => {
          if (response) {
            response.image_urls.forEach((url:any) => {
              this.oldImageUrls.push(url)
            });
            this.postDescription = response.description
          }
        }
      })
    }

    this.descriptionControl = new FormControl(this.postDescription || '', [Validators.required, Validators.maxLength(600)])
  }

  get data(): string {
    return this._context.data
  }

  handleImage(event: any) {
    const files: FileList = event.target.files;
    const maxFiles = 6;
  
    if (files.length + this.imageFiles.length > maxFiles) {
      alert(`You can only upload a maximum of ${maxFiles} images.`);
      return;
    }
  
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (this.imageFiles.length < maxFiles) {
        this.imageFiles.push(file);
        this.newImageUrls.push(URL.createObjectURL(file));
      }
    }
  }
  

  removeImage(index: number) {
    if (this.messageType == 'editPost') {
      this.oldImageUrls.splice(index, 1);
    } else {
      this.newImageUrls.splice(index, 1);
    }
  }

  submitPost() {
    if (this.descriptionControl.valid) {

      this.isLoading = true
      const postData = new FormData()
      postData.append('description', this.descriptionControl.value);
      postData.append('post_id', this.post_id)
      this.imageFiles.forEach((file, index) => {
        postData.append(`image${index + 1}`, file, file.name);
      });

      if (this.messageType == 'editPost') {
        if (this.oldImageUrls && this.oldImageUrls.length > 0) {
          postData.append('oldImageUrls', JSON.stringify(this.oldImageUrls));
        }
        this._postAPIsSubscription = this._postsAPIS.editPost( postData).subscribe({
          next: response => {
            this.closeDialog()
            this._employerStore.dispatch(loadEmployerPostsSuccess({ posts:response.updatedPosts }))
          },
          error: err => {
            this.isLoading = false
            this._alertSubscription = this._alert.open('', {
              label: err.error.message,
              status: 'error',
              autoClose: true,
              hasCloseButton: true
            }).subscribe()       
          },
        })
      } else {
        this._postAPIsSubscription = this._postsAPIS.addPost(postData).subscribe({
          next: response => { 
            this.closeDialog()                   
            this._employerStore.dispatch(addPostSuccess({ post:response.updatedPost }))
          },
  
          error: err => {
            this.isLoading = false
            this._alertSubscription = this._alert.open('', {
              label: err.error.message,
              status: 'error',
              autoClose: true,
              hasCloseButton: true
            }).subscribe()       
          }
        })
      }
    } else {
      this.descriptionControl.markAllAsTouched()
    }
  }

  closeDialog() {
    this._addPostModal.closeAddPostDialogue()
  }

  ngOnDestroy(): void {
    this._employerStoreSubscription?.unsubscribe()
    this._postAPIsSubscription?.unsubscribe()
    this._alertSubscription?.unsubscribe()
  }
}
