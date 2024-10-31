import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobOverviewComponent } from './job-overview.component';

describe('JobOverviewComponent', () => {
  let component: JobOverviewComponent;
  let fixture: ComponentFixture<JobOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JobOverviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JobOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
