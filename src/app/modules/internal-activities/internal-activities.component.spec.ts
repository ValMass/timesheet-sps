import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InternalActivitiesComponent } from './internal-activities.component';

describe('InternalActivitiesComponent', () => {
  let component: InternalActivitiesComponent;
  let fixture: ComponentFixture<InternalActivitiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InternalActivitiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InternalActivitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
