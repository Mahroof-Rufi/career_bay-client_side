import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogueComponent } from './login-register-modal.component';

describe('DialogueComponent', () => {
  let component: DialogueComponent;
  let fixture: ComponentFixture<DialogueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogueComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
