import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedJobsAndPostsComponent } from './saved-jobs.component';

describe('SavedJobsAndPostsComponent', () => {
  let component: SavedJobsAndPostsComponent;
  let fixture: ComponentFixture<SavedJobsAndPostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SavedJobsAndPostsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SavedJobsAndPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
