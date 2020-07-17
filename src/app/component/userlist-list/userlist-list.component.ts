import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AddUserDialogComponent } from '../modal/add-user-dialog/add-user-dialog.component';
import { MatDialogModule, MatDialog  } from '@angular/material/dialog';

@Component({
  selector: 'app-userlist-list',
  templateUrl: './userlist-list.component.html',
  styleUrls: ['./userlist-list.component.css']
})
export class UserlistListComponent implements OnInit {

  userlist: any;
  selectedUser: any;
  constructor(private route: ActivatedRoute,
    public dialog: MatDialog, ) { }

  ngOnInit() {
    const observer = {
      next: x => {
        console.log('Observer got a next value: ' + JSON.stringify(x));
        localStorage.setItem('userResponse', JSON.stringify(x));
        this.userlist = x.userlist.data;
      },
        error: erriks => console.log('Observer got an error: ' + JSON.stringify(erriks)),
        complete: () => console.log('Observer got a complete notification'),
      };

    this.route.data.subscribe(observer);
  }
  RowSelected(u: any){
    this.selectedUser = u;
    console.log(u);   // declare variable in component.
  }

   openDialog() {
    const dialogRef = this.dialog.open(AddUserDialogComponent, {
        width: '300px',
        data: {}
      });
    dialogRef.afterClosed().subscribe(
      res => {

      });
    }
}
