import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfileMainDetailsComponent } from './user-profile-main-details.component';

describe('UserProfileMainDetailsComponent', () => {
  let component: UserProfileMainDetailsComponent;
  let fixture: ComponentFixture<UserProfileMainDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserProfileMainDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserProfileMainDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
