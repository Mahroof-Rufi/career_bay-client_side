import { Injectable, Injector } from '@angular/core';
import { TuiDialogService } from '@taiga-ui/core';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { Observable, Subscription } from 'rxjs';
import { AddPostComponent } from '../components/home/company-posts-component/add-post/add-post.component';

@Injectable()
export class AddPostModalService {

  private addPostDialogue: Observable<any> | undefined;
  private addPostDialogueSubscription!: Subscription

  constructor(
    private dialogueService: TuiDialogService,
    private injector: Injector
  ) { 
    this.initAddPostDialogue()
    }

  initAddPostDialogue() {
    this.addPostDialogue = this.dialogueService.open<any>(
      new PolymorpheusComponent(AddPostComponent, this.injector),
      {
        size:'l',
        data:{ messageType:'addPost' }
      } 
    )
  }

  openAddPostDialogue() {
    this.initAddPostDialogue()
    if (this.addPostDialogue) {
      this.addPostDialogueSubscription = this.addPostDialogue.subscribe()
    }
  }

  closeAddPostDialogue() {
    if (this.addPostDialogueSubscription) {
      this.addPostDialogueSubscription.unsubscribe()
    }
  }

  closeApplicationsStatusChangeDialogue() {
    if (this.addPostDialogueSubscription) {
      this.addPostDialogueSubscription.unsubscribe()
    }
  }

  openDeletePostConfirmation(post_id:string) {
    this.addPostDialogue = this.dialogueService.open<any>(
      new PolymorpheusComponent(AddPostComponent, this.injector),
      {
        size:'l',
        data:{post_id:post_id, messageType:'deleteJob'}
      } 
    )

    if (this.addPostDialogue) {
      this.addPostDialogueSubscription = this.addPostDialogue.subscribe()
    }
  }

  openEditPostDialogue(post_id:string) {
    this.addPostDialogue = this.dialogueService.open<any>(
      new PolymorpheusComponent(AddPostComponent, this.injector),
      {
        size:'l',
        data:{post_id:post_id, messageType:'editPost'}
      } 
    )

    if (this.addPostDialogue) {
      this.addPostDialogueSubscription = this.addPostDialogue.subscribe()
    }
  }
}
