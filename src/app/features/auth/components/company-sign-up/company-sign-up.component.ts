import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { TuiFileLike } from '@taiga-ui/kit';
import { Observable, Subject, finalize, map, of, switchMap, timer } from 'rxjs';

@Component({
  selector: 'app-company-sign-up',
  templateUrl: './company-sign-up.component.html',
  styleUrl: './company-sign-up.component.scss'
})
export class CompanySignUpComponent implements OnInit{

  registrationForm!:FormGroup;
  industries = []
  genders = []
  verificationfile: any;
  

  constructor(private router:Router) {}

  ngOnInit(): void {
    this.registrationForm = new FormGroup({
      companyName: new FormControl(''),
      email: new FormControl(''),
      password: new FormControl(''),
      confirmPassword: new FormControl(''),
      industry: new FormControl(''),

    })
  }

  redirectlogin() {
    this.router.navigateByUrl('/auth/employer/login')
  }

  submitRegistrationForm() {}



  readonly control = new FormControl();
 
    readonly rejectedFiles$ = new Subject<TuiFileLike | null>();
    readonly loadingFiles$ = new Subject<TuiFileLike | null>();
    readonly loadedFiles$ = this.control.valueChanges.pipe(
        switchMap(file => (file ? this.makeRequest(file) : of(null))),
    );
 
    onReject(file: TuiFileLike | readonly TuiFileLike[]): void {
        this.rejectedFiles$.next(file as TuiFileLike);
    }
 
    removeFile(): void {
        this.control.setValue(null);
    }
 
    clearRejected(): void {
        this.removeFile();
        this.rejectedFiles$.next(null);
    }
 
    makeRequest(file: TuiFileLike): Observable<TuiFileLike | null> {
        this.loadingFiles$.next(file);
 
        return timer(1000).pipe(
            map(() => {
                if (Math.random() > 0.5) {
                    return file;
                }
 
                this.rejectedFiles$.next(file);
 
                return null;
            }),
            finalize(() => this.loadingFiles$.next(null)),
        );
    }

}
