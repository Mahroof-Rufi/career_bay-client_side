import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Store } from '@ngrx/store';
import { User } from '../../../store/user-store/user.model';
import { loadAppliedJobs } from '../../../store/user-store/user.actions';
import { getUserId } from '../../../store/user-store/user.selector';

export const loadAppliedJobsGuard: CanActivateFn = (route, state) => {
  
  const userStore = inject(Store<{ user:User }>)
  console.log('just start');
  
  let user_id!:string;
  
  userStore.select(getUserId).subscribe(id => {
    user_id = id
      
    if (user_id) {
      console.log('going to dispatch');
      userStore.dispatch(loadAppliedJobs({ user_id:user_id }))
    }
    
  })
  console.log(user_id);
  
  
  return true;
};
