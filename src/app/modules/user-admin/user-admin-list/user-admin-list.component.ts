import { Component, OnInit, EventEmitter, Output, Input, OnChanges, SimpleChanges } from '@angular/core';
import { UserAdmin } from '../models/User-admin';
import { Router } from '@angular/router';
import { UserAdminService } from '../services/user-admin.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-user-admin-list',
  templateUrl: './user-admin-list.component.html',
  styleUrls: ['./user-admin-list.component.css'],
})
export class UserAdminListComponent implements OnInit, OnChanges {
  @Input() useradmins: UserAdmin[];
  @Output() deleted = new EventEmitter<UserAdmin>();
  @Output() selected = new EventEmitter<UserAdmin>();

  //showbutton
  @Output() showButton = new EventEmitter<Boolean>();

  constructor(
    private router: Router,
    private userAdminService: UserAdminService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    console.log( "useradmins: " ,this.useradmins)
  }
  ngOnChanges(changes: SimpleChanges) {
    console.log('changes: ', changes);
  }
  selectCustomer(user: UserAdmin) {
    //showbutton
    this.showButton.emit(false);
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
