import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfileEducationColComponent } from './user-profile-education-col.component';

describe('UserProfileEducationColComponent', () => {
  let component: UserProfileEducationColComponent;
  let fixture: ComponentFixture<UserProfileEducationColComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserProfileEducationColComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserProfileEducationColComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
