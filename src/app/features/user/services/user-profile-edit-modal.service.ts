import { Injectable, Injector } from '@angular/core';
import { TuiDialogService } from '@taiga-ui/core';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { Observable, Subscription } from 'rxjs';
import { UserMainDetailsEditComponent } from '../components/user-main-details-edit/user-main-details-edit.component';
import { UserAboutEditComponent } from '../components/user-about-edit/user-about-edit.component';
import { UserExperienceEditComponent } from '../components/user-experience-edit/user-experience-edit.component';
import { UserEducationEditComponent } from '../components/user-education-edit/user-education-edit.component';
import { UserSkillsEditComponent } from '../components/user-skills-edit/user-skills-edit.component';

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

  constructor(
    private dialogueService: TuiDialogService,
    private injector: Injector,
  ) {
    this.initializeUserManiDetailsEditDialog();
    this.initializeUserAboutEditDialog();
    this.initializeUserExperienceEditDialog();
    this.initializeUserEducationEditDialog();
    this.initializeUserSkillsEditDialog();
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
}
