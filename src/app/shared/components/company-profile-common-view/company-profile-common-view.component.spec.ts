import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyProfileCommonViewComponent } from './company-profile-common-view.component';

describe('CompanyProfileCommonViewComponent', () => {
  let component: CompanyProfileCommonViewComponent;
  let fixture: ComponentFixture<CompanyProfileCommonViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CompanyProfileCommonViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CompanyProfileCommonViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
