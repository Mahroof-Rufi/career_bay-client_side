import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfileCommonViewComponent } from './user-profile-common-view.component';

describe('UserProfileCommonViewComponent', () => {
  let component: UserProfileCommonViewComponent;
  let fixture: ComponentFixture<UserProfileCommonViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserProfileCommonViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserProfileCommonViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
