import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEventModalUserComponent } from './add-event-modal.component';

describe('AddEventModalComponent', () => {
  let component: AddEventModalUserComponent;
  let fixture: ComponentFixture<AddEventModalUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEventModalUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEventModalUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
