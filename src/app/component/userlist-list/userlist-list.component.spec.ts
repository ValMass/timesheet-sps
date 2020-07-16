import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserlistListComponent } from './userlist-list.component';

describe('UserlistListComponent', () => {
  let component: UserlistListComponent;
  let fixture: ComponentFixture<UserlistListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserlistListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserlistListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
