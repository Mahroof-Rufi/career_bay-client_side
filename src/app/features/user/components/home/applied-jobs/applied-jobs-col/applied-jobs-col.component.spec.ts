import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppliedJobsColComponent } from './applied-jobs-col.component';

describe('AppliedJobsColComponent', () => {
  let component: AppliedJobsColComponent;
  let fixture: ComponentFixture<AppliedJobsColComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppliedJobsColComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AppliedJobsColComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
