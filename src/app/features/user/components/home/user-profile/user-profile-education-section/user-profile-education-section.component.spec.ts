import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfileEducationSectionComponent } from './user-profile-education-section.component';

describe('UserProfileEducationSectionComponent', () => {
  let component: UserProfileEducationSectionComponent;
  let fixture: ComponentFixture<UserProfileEducationSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserProfileEducationSectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserProfileEducationSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
