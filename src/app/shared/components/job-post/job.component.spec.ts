import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobPostComponent } from './job.component';

describe('JobPostComponent', () => {
  let component: JobPostComponent;
  let fixture: ComponentFixture<JobPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JobPostComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JobPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
