import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteExperienxeComponent } from './delete-experienxe.component';

describe('DeleteExperienxeComponent', () => {
  let component: DeleteExperienxeComponent;
  let fixture: ComponentFixture<DeleteExperienxeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteExperienxeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeleteExperienxeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
