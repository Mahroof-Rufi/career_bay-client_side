import { AbstractControl, ValidatorFn } from "@angular/forms";

export const sameEmailValidator: ValidatorFn = (control: AbstractControl): {[key: string]: any} | null => {
    const currentEmail = control.get('currentEmail');
    const newEmail = control.get('newEmail');
    
    return currentEmail && newEmail && currentEmail.value == newEmail.value ? { 'sameEmail': true } : null;
};