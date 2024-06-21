import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobDetailedViewComponent } from './job-detailed-view.component';

describe('JobDetailedViewComponent', () => {
  let component: JobDetailedViewComponent;
  let fixture: ComponentFixture<JobDetailedViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JobDetailedViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JobDetailedViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
