import { Component, OnInit, ChangeDetectionStrategy, EventEmitter, Output, Input } from '@angular/core';
import { UserAdmin } from '../models/User-admin';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-admin-list',
  templateUrl: './user-admin-list.component.html',
  styleUrls: ['./user-admin-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserAdminListComponent implements OnInit {
  @Input() useradmins: UserAdmin[];
  @Output() deleted = new EventEmitter<UserAdmin>();
  @Output() selected = new EventEmitter<UserAdmin>();

  constructor(
    private router: Router,
    ) { }

  ngOnInit(): void {
  }
  selectCustomer(user: UserAdmin) {
    this.selected.emit(user);
  }

  deleteUserAdmin(user: UserAdmin) {
    this.deleted.emit(user);
  }

  trackById(index: number, user: UserAdmin): number {
    return user.id;
  }

  modifyTimesheet(user){
    const ciccio = { state: { id: user.id , name: user.username } };
    const url = 'timesheet/' + user.id;
    this.router.navigateByUrl( url, ciccio);
  }
}
