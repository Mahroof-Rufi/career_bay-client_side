import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AddPostModalService } from '../../services/add-post-modal.service';
import { Store } from '@ngrx/store';
import { Employer } from '../../../admin/store/admin.model';
import { PostsApiServiceService } from '../../../../shared/services/posts-api-service.service';
import { TuiAlertService, TuiDialogContext } from '@taiga-ui/core';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
import { addPostSuccess, deletePostSuccess, loadEmployerPostsSuccess } from '../../store/employer.actions';
import { getPostById } from '../../store/employer.selector';
import { EmployerPosts, Post } from '../../store/employer.model';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrl: './add-post.component.scss'
})
export class AddPostComponent implements OnInit{

  descriptionControl!:FormControl;
  imageFiles: File[] = [];
  oldImageUrls: string[] = [];
  newImageUrls: string[] = [];
  messageType!: string;
  post_id!:string;

  postDescription!:string;

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
      this._employerStore.select(getPostById(this.post_id)).subscribe({
        next: (response:any) => {
          console.log(response);
          
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
    this.oldImageUrls.splice(index, 1);
  }

  submitPost() {
    if (this.descriptionControl.valid) {

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
        this._postsAPIS.editPost( postData).subscribe({
          next: response => {
            console.log(response);
            this._employerStore.dispatch(loadEmployerPostsSuccess({ posts:response.updatedPosts }))
          },

          error: err => {
            console.error(err); 
            this._alert.open('', {
              label: err.error.message,
              status: 'error',
              autoClose: true,
              hasCloseButton: true
            }).subscribe()       
          },

        })
      } else {
        this._postsAPIS.addPost(postData).subscribe({
          next: response => {          
            this._employerStore.dispatch(addPostSuccess({ posts:response.updatedPosts }))
          },
  
          error: err => {
            console.error(err); 
            this._alert.open('', {
              label: err.error.message,
              status: 'error',
              autoClose: true,
              hasCloseButton: true
            }).subscribe()       
          }
        })
      }
      this._addPostModal.closeAddPostDialogue()
    } else {
      this.descriptionControl.markAllAsTouched()
    }
  }

  closeDialog() {
    this._addPostModal.closeAddPostDialogue()
  }

  confirmDelete(postId:string) {
    this._postsAPIS.deletePost(postId).subscribe({
      next: (response:any) => {
        this._employerStore.dispatch(deletePostSuccess({ post_id:response.post_id }))
      },
       
      error: err => {
        this._alert.open('', {
          label: err.error.message,
          status: 'error',
          autoClose: true,
          hasCloseButton: true
        }).subscribe()
      },
    })
    this._addPostModal.closeAddPostDialogue()
  }
}
