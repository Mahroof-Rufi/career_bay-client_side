import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../../../services/auth.service';
import { AddJobPostService } from '../../../../services/add-job-post.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrl: './add-post.component.scss'
})
export class AddPostComponent implements OnInit{

  descriptionControl!:FormControl;
  imageFiles: File[] = [];
  imageUrls: string[] = [];

  constructor(
    private apiService:AuthService,
    private addPostService:AddJobPostService,
  ) {}

  ngOnInit(): void {
    this.descriptionControl = new FormControl('', [Validators.required, Validators.maxLength(600)])
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
        this.imageUrls.push(URL.createObjectURL(file));
      }
    }
  }
  

  removeImage(index: number) {
    this.imageUrls.splice(index, 1);
  }

  submitPost() {
    if (this.descriptionControl.valid) {
      const postData = new FormData()
      postData.append('description', this.descriptionControl.value);

      this.imageFiles.forEach((file, index) => {
        postData.append(`image${index + 1}`, file, file.name);
      });
      
      this.apiService.addPost(postData).subscribe( res => {
        console.log(res);
      }, err => console.log(err))

      this.addPostService.closeModal()
    } else {
      this.descriptionControl.markAllAsTouched()
    }
  }
}
