import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyPostsComponentComponent } from './posts.component';

describe('CompanyPostsComponentComponent', () => {
  let component: CompanyPostsComponentComponent;
  let fixture: ComponentFixture<CompanyPostsComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CompanyPostsComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CompanyPostsComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
