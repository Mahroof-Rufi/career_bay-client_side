import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteExperienceComponent } from './delete-experience.component';

describe('DeleteExperienxeComponent', () => {
  let component: DeleteExperienceComponent;
  let fixture: ComponentFixture<DeleteExperienceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteExperienceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeleteExperienceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
