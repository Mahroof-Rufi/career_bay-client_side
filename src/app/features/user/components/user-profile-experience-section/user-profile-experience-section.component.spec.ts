import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfileExperienceSectionComponent } from './user-profile-experience-section.component';

describe('UserProfileExperienceSectionComponent', () => {
  let component: UserProfileExperienceSectionComponent;
  let fixture: ComponentFixture<UserProfileExperienceSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserProfileExperienceSectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserProfileExperienceSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
