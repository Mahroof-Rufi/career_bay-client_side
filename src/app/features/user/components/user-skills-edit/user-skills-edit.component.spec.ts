import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSkillsEditComponent } from './user-skills-edit.component';

describe('UserSkillsEditComponent', () => {
  let component: UserSkillsEditComponent;
  let fixture: ComponentFixture<UserSkillsEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserSkillsEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserSkillsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
