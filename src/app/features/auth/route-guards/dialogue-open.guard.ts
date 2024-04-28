import { Injector, inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TuiDialogService } from '@taiga-ui/core';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { DialogueComponent } from '../../../components/dialogue/dialogue.component';
import { userLoginComponent } from '../components/user-login/user-login.component';

export const dialogueOpenGuard: CanActivateFn = () => {
  console.log('thi ssssssssssss');
  
  const dialogueService = inject(TuiDialogService)
  const injector = inject(Injector)
  const router = inject(Router)

  const registrationDialogue = dialogueService.open<number>( new PolymorpheusComponent(DialogueComponent, injector), {
    size:'fullscreen'
  })

  registrationDialogue.subscribe({
    next: data => console.log(data),
    complete: () => router.navigateByUrl('/home')         
  })
  return true
};
