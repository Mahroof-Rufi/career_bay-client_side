import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ModalService } from '../services/modal.service';

export const dialogueOpenGuard: CanActivateFn = () => {
  
  const dialogueService = inject(ModalService)
  const router = inject(Router)

  dialogueService.openModal().subscribe({
    next: data => console.log(data),
    complete: () =>{
      router.navigateByUrl('/home') 
      console.log('successfully navigated');
    }        
  })

  return true
};
