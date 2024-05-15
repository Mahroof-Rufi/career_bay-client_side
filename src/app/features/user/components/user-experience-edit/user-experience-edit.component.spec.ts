import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserExperienceEditComponent } from './user-experience-edit.component';

describe('UserExperienceEditComponent', () => {
  let component: UserExperienceEditComponent;
  let fixture: ComponentFixture<UserExperienceEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserExperienceEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserExperienceEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
