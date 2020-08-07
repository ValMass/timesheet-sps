import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAdminCreationComponent } from './user-admin-creation.component';

describe('UserAdminCreationComponent', () => {
  let component: UserAdminCreationComponent;
  let fixture: ComponentFixture<UserAdminCreationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserAdminCreationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAdminCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
