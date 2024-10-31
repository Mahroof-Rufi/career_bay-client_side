import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfileAboutSectionComponent } from './user-profile-about-section.component';

describe('UserProfileAboutSectionComponent', () => {
  let component: UserProfileAboutSectionComponent;
  let fixture: ComponentFixture<UserProfileAboutSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserProfileAboutSectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserProfileAboutSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
