import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InternalActivitiesListComponent } from './internal-activities-list.component';

describe('InternalActivitiesListComponent', () => {
  let component: InternalActivitiesListComponent;
  let fixture: ComponentFixture<InternalActivitiesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InternalActivitiesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InternalActivitiesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
