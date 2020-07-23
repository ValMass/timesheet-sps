import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficelistPageComponent } from './officelist-page.component';

describe('OfficelistPageComponent', () => {
  let component: OfficelistPageComponent;
  let fixture: ComponentFixture<OfficelistPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfficelistPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfficelistPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
