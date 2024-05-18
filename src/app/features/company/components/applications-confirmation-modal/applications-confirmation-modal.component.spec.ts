import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationsConfirmationModalComponent } from './applications-confirmation-modal.component';

describe('ApplicationsConfirmationModalComponent', () => {
  let component: ApplicationsConfirmationModalComponent;
  let fixture: ComponentFixture<ApplicationsConfirmationModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ApplicationsConfirmationModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ApplicationsConfirmationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
