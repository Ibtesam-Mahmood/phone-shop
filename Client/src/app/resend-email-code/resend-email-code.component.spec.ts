import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResendEmailCodeComponent } from './resend-email-code.component';

describe('ResendEmailCodeComponent', () => {
  let component: ResendEmailCodeComponent;
  let fixture: ComponentFixture<ResendEmailCodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResendEmailCodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResendEmailCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
