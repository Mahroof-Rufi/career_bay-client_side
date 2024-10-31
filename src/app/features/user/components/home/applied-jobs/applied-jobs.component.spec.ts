import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppliedJobsComponent } from './applied-jobs.component';

describe('AppliedJobsComponent', () => {
  let component: AppliedJobsComponent;
  let fixture: ComponentFixture<AppliedJobsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppliedJobsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AppliedJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
