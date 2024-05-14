import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfileExperienceColComponent } from './user-profile-experience-col.component';

describe('UserProfileExperienceColComponent', () => {
  let component: UserProfileExperienceColComponent;
  let fixture: ComponentFixture<UserProfileExperienceColComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserProfileExperienceColComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserProfileExperienceColComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
