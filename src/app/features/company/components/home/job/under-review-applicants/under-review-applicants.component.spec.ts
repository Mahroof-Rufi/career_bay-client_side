import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnderReviewApplicantsComponent } from './under-review-applicants.component';

describe('UnderReviewApplicantsComponent', () => {
  let component: UnderReviewApplicantsComponent;
  let fixture: ComponentFixture<UnderReviewApplicantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UnderReviewApplicantsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UnderReviewApplicantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
