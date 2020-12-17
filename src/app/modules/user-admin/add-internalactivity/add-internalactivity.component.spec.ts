import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddInternalactivityComponent } from './add-internalactivity.component';

describe('AddInternalactivityComponent', () => {
  let component: AddInternalactivityComponent;
  let fixture: ComponentFixture<AddInternalactivityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddInternalactivityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddInternalactivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
