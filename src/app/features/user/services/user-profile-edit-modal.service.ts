import { Injectable, Injector } from '@angular/core';
import { TuiDialogService } from '@taiga-ui/core';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { Observable, Subscription } from 'rxjs';
import { UserMainDetailsEditComponent } from '../components/home/user-profile/user-profile-main-details/user-main-details-edit/user-main-details-edit.component';
import { UserAboutEditComponent } from '../components/home/user-profile/user-profile-about-section/user-about-edit/user-about-edit.component';
import { UserExperienceEditComponent } from '../components/home/user-profile/user-profile-experience-section/user-experience-edit/user-experience-edit.component';
import { UserEducationEditComponent } from '../components/home/user-profile/user-profile-education-section/user-education-edit/user-education-edit.component';
import { UserSkillsEditComponent } from '../components/home/user-profile/user-profile-skills-section/user-skills-edit/user-skills-edit.component';
import { ChangeEmailComponent } from '../components/home/change-email/change-email.component';
import { DeleteExperienceComponent } from '../components/delete-experience/delete-experience.component';

@Injectable()
export class UserProfileEditModalService {

  private maniDetailsEditDialogue: Observable<any> | undefined;
  private maniDetailsEditSubscription!: Subscription

  private aboutEditDialogue: Observable<any> | undefined;
  private aboutEditSubscription!: Subscription

  private experienceAddAndEditDialogue: Observable<any> | undefined;
  private experienceAddAndEditSubscription!: Subscription

  private educationAddAndEditDialogue: Observable<any> | undefined;
  private educationAddAndEditSubscription!: Subscription

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
    this.experienceAddAndEditDialogue = this.dialogueService.open<any>(
      new PolymorpheusComponent(UserExperienceEditComponent, this.injector),
      {
        size:'l'
      }
    )
  }

  private initializeUserEducationEditDialog() {
    this.educationAddAndEditDialogue = this.dialogueService.open<any>(
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
      this.maniDetailsEditSubscription = this.maniDetailsEditDialogue.subscribe((result) => {
        
      })
    }
  }

  closeUserMainDetailsModal() {
    if (this.maniDetailsEditSubscription) {
      this.maniDetailsEditSubscription.unsubscribe()
    }
  }

  

  openUserAboutEditModal() {
    if (this.aboutEditDialogue) {
      this.aboutEditSubscription = this.aboutEditDialogue.subscribe((result) => {
        
      })
    }
  }

  closeUserAboutEditModal() {
    if (this.aboutEditSubscription) {
      this.aboutEditSubscription.unsubscribe()
    }
  }



  openUserExperienceEditModal(experienceId?:string) {
    if (experienceId) {
      this.experienceAddAndEditDialogue = this.dialogueService.open<any>(
        new PolymorpheusComponent(UserExperienceEditComponent, this.injector),
        {
          size:'l',
          data:experienceId
        }
      )
    }
    if (this.experienceAddAndEditDialogue) {
      this.experienceAddAndEditSubscription = this.experienceAddAndEditDialogue.subscribe((result) => {
        
      })
    }
  }

  closeUserExperienceEditModal() {
    if (this.experienceAddAndEditSubscription) {
      this.experienceAddAndEditSubscription.unsubscribe()
    }
  }



  openUserEducationEditModal(education_id?:string) {
    if (education_id) {
      this.educationAddAndEditDialogue = this.dialogueService.open<any>(
        new PolymorpheusComponent(UserEducationEditComponent, this.injector),
        {
          size:'l',
          data:education_id
        })
    }
    if (this.educationAddAndEditDialogue) {
      this.educationAddAndEditSubscription = this.educationAddAndEditDialogue.subscribe((result) => {

      })
    }
  }

  closeUserEducationEditModal() {
    if (this.educationAddAndEditSubscription) {
      this.educationAddAndEditSubscription.unsubscribe()
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
        new PolymorpheusComponent(DeleteExperienceComponent, this.injector),
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

  openDeleteEducationModal(education_id?:string) {
    if (education_id) {
      this.educationDeleteDialogue = this.dialogueService.open<any>(
        new PolymorpheusComponent(DeleteExperienceComponent, this.injector),
        {
          size:'m',
          data:{_id:education_id, type:'edu'}
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
