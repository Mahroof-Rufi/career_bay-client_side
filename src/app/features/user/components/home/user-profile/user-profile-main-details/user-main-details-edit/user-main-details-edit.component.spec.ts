import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMainDetailsEditComponent } from './user-main-details-edit.component';

describe('UserMainDetailsEditComponent', () => {
  let component: UserMainDetailsEditComponent;
  let fixture: ComponentFixture<UserMainDetailsEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserMainDetailsEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserMainDetailsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
