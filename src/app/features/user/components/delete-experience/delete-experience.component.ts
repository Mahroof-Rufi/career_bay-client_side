import { Component, Inject, OnInit } from '@angular/core';
import { UserProfileEditModalService } from '../../services/user-profile-edit-modal.service';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
import { TuiDialogContext } from '@taiga-ui/core';
import { Store } from '@ngrx/store';
import { User } from '../../../admin/store/admin.model';
import { deleteUserEducation, deleteUserExperience } from '../../user-store/user.actions';

@Component({
  selector: 'app-delete-experience',
  templateUrl: './delete-experience.component.html',
  styleUrl: './delete-experience.component.scss'
})
export class DeleteExperienceComponent implements OnInit{

  _id!:string;
  type!:string;

  constructor(
    private readonly _profileEditModal:UserProfileEditModalService,
    @Inject(POLYMORPHEUS_CONTEXT)
    private readonly _context: TuiDialogContext<string, string>,
    private readonly _userStore:Store<{ user:User }>
  ) {}

  ngOnInit(): void {
    this.type = this.data.type
    this._id = this.data._id
  }

  get data():any {
    return this._context.data
  }

  cancelExp() {
    this._profileEditModal.closeDeleteExperienceModal()
  }

  deleteExp(exp_id:string) {
    this._userStore.dispatch(deleteUserExperience({ exp_id:exp_id }))
    this._profileEditModal.closeDeleteExperienceModal()
  }

  cancelEdu() {
    this._profileEditModal.closeDeleteEducationModal()
  }

  deleteEdu(edu_id:string) {
    
    this._userStore.dispatch(deleteUserEducation({ edu_id:edu_id }))
    this._profileEditModal.closeDeleteEducationModal()
  }
}
