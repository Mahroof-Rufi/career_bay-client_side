import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAboutEditComponent } from './user-about-edit.component';

describe('UserAboutEditComponent', () => {
  let component: UserAboutEditComponent;
  let fixture: ComponentFixture<UserAboutEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserAboutEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserAboutEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
