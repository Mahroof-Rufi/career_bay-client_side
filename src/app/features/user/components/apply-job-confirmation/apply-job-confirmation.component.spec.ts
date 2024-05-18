import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplyJobConfirmationComponent } from './apply-job-confirmation.component';

describe('ApplyJobConfirmationComponent', () => {
  let component: ApplyJobConfirmationComponent;
  let fixture: ComponentFixture<ApplyJobConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ApplyJobConfirmationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ApplyJobConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
