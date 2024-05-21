import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserEducationSectionViewComponent } from './user-education-section-view.component';

describe('UserEducationSectionViewComponent', () => {
  let component: UserEducationSectionViewComponent;
  let fixture: ComponentFixture<UserEducationSectionViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserEducationSectionViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserEducationSectionViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
