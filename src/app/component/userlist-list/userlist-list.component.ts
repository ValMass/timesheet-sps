import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AddUserDialogComponent } from '../modal/add-user-dialog/add-user-dialog.component';
import { MatDialogModule, MatDialog,  } from '@angular/material/dialog';
import { MatIconModule  } from '@angular/material/icon';
import { UserService } from '@app/services/user.service';

@Component({
  selector: 'app-userlist-list',
  templateUrl: './userlist-list.component.html',
  styleUrls: ['./userlist-list.component.css']
})
export class UserlistListComponent implements OnInit {
  toDelete;
  userlist: any[];
  selectedUser: any;
  constructor(private route: ActivatedRoute,
              public dialog: MatDialog,
              private saveCurrentUserInstance: UserService ) { }

  ngOnInit() {
    const observer = {
      next: x => {
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
        width: '600px',
        height: '700px',
        data: {}
      });
    dialogRef.afterClosed().subscribe(
      res => {
        this.saveCurrentUserInstance.save(res).subscribe(
          res => {

            const ciao = res['data'];
            this.userlist = [...this.userlist, ciao];
          },
          error => {
            console.log('errore');
            console.log(error);

          }
        );
        console.log(res);
      },
      error => {
        console.log(error);
      });
    }

    delete(user) {
      let output;
      for (let element of this.userlist){
        if (element.id === user.id) {
          console.log(element);
          this.saveCurrentUserInstance.delete(element).subscribe(
            res => {
              this.userlist.splice(this.userlist.indexOf(element), 1);
            },
            error => {
              console.log(error);

            }
          );
        } else {

        }
      }
      console.log(this.toDelete);

    }
}
