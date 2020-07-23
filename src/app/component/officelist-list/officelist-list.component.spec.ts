import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficelistListComponent } from './officelist-list.component';

describe('OfficelistListComponent', () => {
  let component: OfficelistListComponent;
  let fixture: ComponentFixture<OfficelistListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfficelistListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfficelistListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
