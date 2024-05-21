import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfileAboutViewComponent } from './user-profile-about-view.component';

describe('UserProfileAboutViewComponent', () => {
  let component: UserProfileAboutViewComponent;
  let fixture: ComponentFixture<UserProfileAboutViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserProfileAboutViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserProfileAboutViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
