import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfileSkillsSectionComponent } from './user-profile-skills-section.component';

describe('UserProfileSkillsSectionComponent', () => {
  let component: UserProfileSkillsSectionComponent;
  let fixture: ComponentFixture<UserProfileSkillsSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserProfileSkillsSectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserProfileSkillsSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
