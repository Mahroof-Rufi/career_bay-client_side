import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteJobConfirmationComponent } from './delete-job-confirmation.component';

describe('DeleteJobConfirmationComponent', () => {
  let component: DeleteJobConfirmationComponent;
  let fixture: ComponentFixture<DeleteJobConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteJobConfirmationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeleteJobConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
