import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserEducationColViewComponent } from './user-education-col-view.component';

describe('UserEducationColViewComponent', () => {
  let component: UserEducationColViewComponent;
  let fixture: ComponentFixture<UserEducationColViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserEducationColViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserEducationColViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
