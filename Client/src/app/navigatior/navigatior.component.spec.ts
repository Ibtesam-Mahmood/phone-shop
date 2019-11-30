import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigatiorComponent } from './navigatior.component';

describe('NavigatiorComponent', () => {
  let component: NavigatiorComponent;
  let fixture: ComponentFixture<NavigatiorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavigatiorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigatiorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
