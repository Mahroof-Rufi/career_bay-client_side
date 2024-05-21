import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSkillsSectionViewComponent } from './user-skills-section-view.component';

describe('UserSkillsSectionViewComponent', () => {
  let component: UserSkillsSectionViewComponent;
  let fixture: ComponentFixture<UserSkillsSectionViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserSkillsSectionViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserSkillsSectionViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
