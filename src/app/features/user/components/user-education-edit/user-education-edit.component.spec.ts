import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserEducationEditComponent } from './user-education-edit.component';

describe('UserEducationEditComponent', () => {
  let component: UserEducationEditComponent;
  let fixture: ComponentFixture<UserEducationEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserEducationEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserEducationEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
