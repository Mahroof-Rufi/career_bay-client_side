import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Store } from '@ngrx/store';
import { User } from '../../../store/user-store/user.model';
import { getUserId } from '../../../store/user-store/user.selector';
import { isApplied } from '../../../store/user-store/user.actions';

export const verifyUserApplicationGuard: CanActivateFn = (route, state) => {
  console.log('llllllll');
  
  const userStore = inject(Store<{ user:User }>)
  console.log('start');
  let userId!:string;
  let jobId:string | null = route.paramMap.get('id')
  userStore.select(getUserId).subscribe(id => {
    console.log(id);
    
    userId = id 
    if (jobId && userId) {
      userStore.dispatch(isApplied({ userId:userId, jobId:jobId }))
      console.log('executred');
      
    }
  })
  return true;
};
