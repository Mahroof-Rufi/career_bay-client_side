import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserExperienceColViewComponent } from './user-experience-col-view.component';

describe('UserExperienceColViewComponent', () => {
  let component: UserExperienceColViewComponent;
  let fixture: ComponentFixture<UserExperienceColViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserExperienceColViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserExperienceColViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
