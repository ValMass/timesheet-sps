import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AddUserDialogComponent } from '../modal/add-user-dialog/add-user-dialog.component';
import { MatDialogModule, MatDialog,  } from '@angular/material/dialog';
import { MatIconModule  } from '@angular/material/icon';
import { UserService } from '@app/services/user.service';

@Component({
  selector: 'app-officelist-list',
  templateUrl: './officelist-list.component.html',
  styleUrls: ['./officelist-list.component.css']
})
export class OfficelistListComponent implements OnInit {
  toDelete;
  officelist: any[];
  selectedUser: any;
  constructor(private route: ActivatedRoute,
              private router: Router,
              public dialog: MatDialog,
              private saveCurrentUserInstance: UserService ) { }

  ngOnInit() {
    const observer = {
      next: x => {
        this.officelist = x.officelist.data;
      },
        error: erriks => console.log('Observer got an error: ' + JSON.stringify(erriks)),
        complete: () => console.log('Observer got a complete notification'),
      };

    this.route.data.subscribe(observer);
  }
  RowSelected(u: any){
    this.selectedUser = u;
    console.log(u);   // declare variable in component.
    this.router.navigate( ['/detail/' + u.id ]);
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
          result => {

            const newUser = result['data'];
            this.officelist = [...this.officelist, newUser];
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
      for (let element of this.officelist){
        if (element.id === user.id) {
          console.log(element);
          this.saveCurrentUserInstance.delete(element).subscribe(
            res => {
              this.officelist.splice(this.officelist.indexOf(element), 1);
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
