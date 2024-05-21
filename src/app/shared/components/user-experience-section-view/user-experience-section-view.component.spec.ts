import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserExperienceSectionViewComponent } from './user-experience-section-view.component';

describe('UserExperienceSectionViewComponent', () => {
  let component: UserExperienceSectionViewComponent;
  let fixture: ComponentFixture<UserExperienceSectionViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserExperienceSectionViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserExperienceSectionViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
