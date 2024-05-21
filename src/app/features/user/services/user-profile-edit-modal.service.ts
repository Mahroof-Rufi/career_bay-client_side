import { Injectable, Injector } from '@angular/core';
import { TuiDialogService } from '@taiga-ui/core';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { Observable, Subscription } from 'rxjs';
import { UserMainDetailsEditComponent } from '../components/user-main-details-edit/user-main-details-edit.component';
import { UserAboutEditComponent } from '../components/user-about-edit/user-about-edit.component';
import { UserExperienceEditComponent } from '../components/user-experience-edit/user-experience-edit.component';
import { UserEducationEditComponent } from '../components/user-education-edit/user-education-edit.component';
import { UserSkillsEditComponent } from '../components/user-skills-edit/user-skills-edit.component';
import { ChangeEmailComponent } from '../components/change-email/change-email.component';
import { DeleteExperienxeComponent } from '../components/delete-experienxe/delete-experienxe.component';

@Injectable({
  providedIn: 'root'
})
export class UserProfileEditModalService {

  private maniDetailsEditDialogue: Observable<any> | undefined;
  private maniDetailsEditSubsciption!: Subscription

  private aboutEditDialogue: Observable<any> | undefined;
  private aboutEditSubsciption!: Subscription

  private experienceAddandEditDialogue: Observable<any> | undefined;
  private experienceAddandEditSubsciption!: Subscription

  private educationAddandEditDialogue: Observable<any> | undefined;
  private educationAddandEditSubsciption!: Subscription

  private skillsEditDialogue: Observable<any> | undefined;
  private skillsEditSubscription!: Subscription

  private changeEmailDialogue:Observable<any> | undefined;
  private changeEmailSubscription!: Subscription

  private experienceDeleteDialogue:Observable<any> | undefined;
  private experienceDeleteSubscription!: Subscription

  private educationDeleteDialogue:Observable<any> | undefined;
  private educationDeleteSubscription!: Subscription

  constructor(
    private dialogueService: TuiDialogService,
    private injector: Injector,
  ) {
    this.initializeUserManiDetailsEditDialog();
    this.initializeUserAboutEditDialog();
    this.initializeUserExperienceEditDialog();
    this.initializeUserEducationEditDialog();
    this.initializeUserSkillsEditDialog();
    this.initializeChangeEmailDialogue();
  }

  private initializeUserManiDetailsEditDialog() {
    this.maniDetailsEditDialogue = this.dialogueService.open<any>(
      new PolymorpheusComponent(UserMainDetailsEditComponent, this.injector),
      {
        size:'l',
      },
    );
  }

  private initializeUserAboutEditDialog() {
    this.aboutEditDialogue = this.dialogueService.open<any>(
      new PolymorpheusComponent(UserAboutEditComponent, this.injector),
      {
        size:'l'
      }
    )
  }

  private initializeUserExperienceEditDialog() {
    this.experienceAddandEditDialogue = this.dialogueService.open<any>(
      new PolymorpheusComponent(UserExperienceEditComponent, this.injector),
      {
        size:'l'
      }
    )
  }

  private initializeUserEducationEditDialog() {
    this.educationAddandEditDialogue = this.dialogueService.open<any>(
      new PolymorpheusComponent(UserEducationEditComponent, this.injector),
      {
        size:'l'
      }
    )
  }

  private initializeUserSkillsEditDialog() {
    this.skillsEditDialogue = this.dialogueService.open<any>(
      new PolymorpheusComponent(UserSkillsEditComponent, this.injector),
      {
        size:'l'
      }
    )
  }

  private initializeChangeEmailDialogue() {
    this.changeEmailDialogue = this.dialogueService.open<any>(
    new PolymorpheusComponent(ChangeEmailComponent, this.injector),
    {
      size:'s'
    }
    )
  }

  openUserMainDetailsModal() {
    if (this.maniDetailsEditDialogue) {
      this.maniDetailsEditSubsciption = this.maniDetailsEditDialogue.subscribe((result) => {
        
      })
    }
  }

  closeUserMainDetailsModal() {
    if (this.maniDetailsEditSubsciption) {
      this.maniDetailsEditSubsciption.unsubscribe()
    }
  }

  

  openUseraboutEditModal() {
    if (this.aboutEditDialogue) {
      this.aboutEditSubsciption = this.aboutEditDialogue.subscribe((result) => {
        
      })
    }
  }

  closeUseraboutEditModal() {
    if (this.aboutEditSubsciption) {
      this.aboutEditSubsciption.unsubscribe()
    }
  }



  openUserexperienceEditModal(experienceId?:string) {
    if (experienceId) {
      this.experienceAddandEditDialogue = this.dialogueService.open<any>(
        new PolymorpheusComponent(UserExperienceEditComponent, this.injector),
        {
          size:'l',
          data:experienceId
        }
      )
    }
    if (this.experienceAddandEditDialogue) {
      this.experienceAddandEditSubsciption = this.experienceAddandEditDialogue.subscribe((result) => {
        
      })
    }
  }

  closeUserexperienceEditModal() {
    if (this.experienceAddandEditSubsciption) {
      this.experienceAddandEditSubsciption.unsubscribe()
    }
  }



  openUserEducationEditModal(edct_id?:string) {
    if (edct_id) {
      this.educationAddandEditDialogue = this.dialogueService.open<any>(
        new PolymorpheusComponent(UserEducationEditComponent, this.injector),
        {
          size:'l',
          data:edct_id
        })
    }
    if (this.educationAddandEditDialogue) {
      this.educationAddandEditSubsciption = this.educationAddandEditDialogue.subscribe((result) => {

      })
    }
  }

  closeUserEducationEditModdal() {
    if (this.educationAddandEditSubsciption) {
      this.educationAddandEditSubsciption.unsubscribe()
    }
  }



  openUserSkillsEditModal() {
    if (this.skillsEditDialogue) {
      this.skillsEditSubscription = this.skillsEditDialogue.subscribe((result) => {
        
      })
    }
  }

  closeUserSkillsEditModal() {
    if (this.skillsEditSubscription) {
      this.skillsEditSubscription.unsubscribe()
    }
  }

  openChangeEmailModal() {
    if (this.changeEmailDialogue) {
      this.changeEmailDialogue.subscribe()
    }
  }

  closeChangeEmailModal() {
    if (this.changeEmailSubscription) {
      this.changeEmailSubscription.unsubscribe()
    }
  }

  openDeleteExperienceModal(experienceId?:string) {
    if (experienceId) {
      this.experienceDeleteDialogue = this.dialogueService.open<any>(
        new PolymorpheusComponent(DeleteExperienxeComponent, this.injector),
        {
          size:'m',
          data:{_id:experienceId, type:'exp'}
        }
      )
    }
    if (this.experienceDeleteDialogue) {
      this.experienceDeleteSubscription = this.experienceDeleteDialogue.subscribe((result) => {
        
      })
    }
  }

  closeDeleteExperienceModal() {
    if (this.experienceDeleteSubscription) {
      this.experienceDeleteSubscription.unsubscribe()
    }
  }

  openDeleteEducationModal(eductn_id?:string) {
    if (eductn_id) {
      this.educationDeleteDialogue = this.dialogueService.open<any>(
        new PolymorpheusComponent(DeleteExperienxeComponent, this.injector),
        {
          size:'m',
          data:{_id:eductn_id, type:'edu'}
        }
      )
    }
    if (this.educationDeleteDialogue) {      
      this.educationDeleteSubscription = this.educationDeleteDialogue.subscribe((result) => {
        
      })
    }
  }

  closeDeleteEducationModal() {
    if (this.educationDeleteSubscription) {
      this.educationDeleteSubscription.unsubscribe()
    }
  }
}
