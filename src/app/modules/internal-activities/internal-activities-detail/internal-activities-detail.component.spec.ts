import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InternalActivitiesDetailComponent } from './internal-activities-detail.component';

describe('InternalActivitiesDetailComponent', () => {
  let component: InternalActivitiesDetailComponent;
  let fixture: ComponentFixture<InternalActivitiesDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InternalActivitiesDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InternalActivitiesDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
