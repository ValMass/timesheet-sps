import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAnagComponent } from './user-anag.component';

describe('UserAnagComponent', () => {
  let component: UserAnagComponent;
  let fixture: ComponentFixture<UserAnagComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserAnagComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAnagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
