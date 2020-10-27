import { Component, OnInit, ChangeDetectionStrategy, EventEmitter, Output, Input, OnChanges, SimpleChanges } from '@angular/core';
import { UserAdmin } from '../models/User-admin';
import { Router } from '@angular/router';
import { UserAdminCreationComponent } from '../user-admin-creation/user-admin-creation.component';
import { UserAdminService } from '../services/user-admin.service';
import { MatDialog } from '@angular/material/dialog';
import { FileService } from '@app/shared/services/file.service';
import * as fileSaver from 'file-saver';

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

  //showbutton
  @Output() showButton = new EventEmitter<Boolean>();

  constructor(
    private fileservice: FileService,
    private router: Router,
    private userAdminService: UserAdminService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    console.log(this.useradmins);
  }
  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
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

  exportinXlsx() {
    const viewDate = new Date();
    const month = viewDate.getMonth();
    const year = viewDate.getFullYear();
    const nomefile = 'TimesheetExport' + '_' + month + '_' + year;
    this.fileservice.downloadTimesheetSummaryFile( month, year ).subscribe(response => {
      let blob: any = new Blob([response], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet; charset=utf-8' });
      const url = window.URL.createObjectURL(blob);
      // window.open(url);
      // window.location.href = response.url;
      fileSaver.saveAs(blob, nomefile);
    }),
    error => {
      console.log('Error downloading the file' , error);
    },
    () => {
      console.info('File downloaded successfully');
    }
  }
}
