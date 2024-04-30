import { inject } from '@angular/core';
import { CanDeactivateFn } from '@angular/router';
import { ModalService } from '../services/modal.service';

export const dialogueCloseGuard: CanDeactivateFn<unknown> = (component, currentRoute, currentState, nextState) => {
  const modalService = inject(ModalService)
  modalService.closeModal()
  return true;
};
