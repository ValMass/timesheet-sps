import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserprofilePageComponent } from './userprofile-page.component';

describe('UserprofilePageComponent', () => {
  let component: UserprofilePageComponent;
  let fixture: ComponentFixture<UserprofilePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserprofilePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserprofilePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
