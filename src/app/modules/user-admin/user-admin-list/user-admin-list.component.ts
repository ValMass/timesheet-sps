import { Component, OnInit, ChangeDetectionStrategy, EventEmitter, Output, Input, OnChanges, SimpleChanges } from '@angular/core';
import { UserAdmin } from '../models/User-admin';
import { Router } from '@angular/router';
import { UserAdminCreationComponent } from '../user-admin-creation/user-admin-creation.component';
import { UserAdminService } from '../services/user-admin.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-user-admin-list',
  templateUrl: './user-admin-list.component.html',
  styleUrls: ['./user-admin-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserAdminListComponent implements OnInit, OnChanges {
  @Input() useradmins: UserAdmin[];
  @Output() deleted = new EventEmitter<UserAdmin>();
  @Output() selected = new EventEmitter<UserAdmin>();

  constructor(
    private router: Router,
    private userAdminService: UserAdminService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
  }
  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
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

  modifyTimesheet(user) {
    console.log(user);
    const ciccio = { state: { id: user.id, name: user.username } };
    const url = 'timesheet/' + user.id;
    this.router.navigateByUrl(url, ciccio);
  }
}
