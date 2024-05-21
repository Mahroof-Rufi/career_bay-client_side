import { Component, Inject, OnInit } from '@angular/core';
import { UserProfileEditModalService } from '../../services/user-profile-edit-modal.service';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
import { TuiDialogContext } from '@taiga-ui/core';
import { Store } from '@ngrx/store';
import { User } from '../../../admin/store/admin.model';
import { deleteUserEducation, deleteUserExperience } from '../../../../store/user-store/user.actions';

@Component({
  selector: 'app-delete-experienxe',
  templateUrl: './delete-experienxe.component.html',
  styleUrl: './delete-experienxe.component.scss'
})
export class DeleteExperienxeComponent implements OnInit{

  _id!:string;
  type!:string;

  constructor(
    private profileEditService:UserProfileEditModalService,
    @Inject(POLYMORPHEUS_CONTEXT)
    private readonly context: TuiDialogContext<string, string>,
    private userStore:Store<{ user:User }>
  ) {}

  ngOnInit(): void {
    this.type = this.data.type
    this._id = this.data._id
  }

  get data():any {
    return this.context.data
  }

  cancelExp() {
    this.profileEditService.closeDeleteExperienceModal()
  }

  deleteExp(exp_id:string) {
    this.userStore.dispatch(deleteUserExperience({ exp_id:exp_id }))
    this.profileEditService.closeDeleteExperienceModal()
  }

  cancelEdu() {
    this.profileEditService.closeDeleteEducationModal()
  }

  deleteEdu(edu_id:string) {
    console.log('deletEdu',edu_id);
    
    this.userStore.dispatch(deleteUserEducation({ edu_id:edu_id }))
    this.profileEditService.closeDeleteEducationModal()
  }
}
