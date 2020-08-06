import { Component, OnInit, ChangeDetectionStrategy, EventEmitter, Output, Input } from '@angular/core';
import { UserAdmin } from '../models/User-admin';

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

  constructor() { }

  ngOnInit(): void {
  }
  selectCustomer(user: UserAdmin) {
    this.selected.emit(user);
  }

  deleteCustomer(user: UserAdmin) {
    console.log('emit');

    this.deleted.emit(user);
  }

  trackById(index: number, user: UserAdmin): number {
    return user.id;
  }
}
