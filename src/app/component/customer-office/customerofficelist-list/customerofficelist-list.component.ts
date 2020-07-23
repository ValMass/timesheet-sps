import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AddCustomerOfficeDialogComponent } from '../../modal-customer-office/add-dialog/add-dialog.component';
import { MatDialogModule, MatDialog,  } from '@angular/material/dialog';
import { MatIconModule  } from '@angular/material/icon';
import { CustomerOfficeService } from '@app/services/customeroffice.service';

@Component({
  selector: 'app-customerofficelist-list',
  templateUrl: './customerofficelist-list.component.html',
  styleUrls: ['./customerofficelist-list.component.css']
})
export class CustomerOfficelistListComponent implements OnInit {
  toDelete;
  customerofficelist: any[];
  selectedCustomerOffice: any;
  constructor(private route: ActivatedRoute,
              private router: Router,
              public dialog: MatDialog,
              private saveCurrentCustomerOfficeInstance: CustomerOfficeService ) { }

  ngOnInit() {
    const observer = {
      next: x => {
        this.customerofficelist = x.customerofficelist.data;
      },
        error: erriks => console.log('Observer got an error: ' + JSON.stringify(erriks)),
        complete: () => console.log('Observer got a complete notification'),
      };

    this.route.data.subscribe(observer);
  }
  RowSelected(u: any){
    this.selectedCustomerOffice = u;
    console.log(u);   // declare variable in component.
    this.router.navigate( ['/detail/' + u.id ]);
  }

   openDialog() {
    const dialogRef = this.dialog.open(AddCustomerOfficeDialogComponent, {
        width: '600px',
        height: '700px',
        data: {}
      });
    dialogRef.afterClosed().subscribe(
      res => {
        this.saveCurrentCustomerOfficeInstance.save(res).subscribe(
          result => {

            const newCustomerOffice = result['data'];
            this.customerofficelist = [...this.customerofficelist, newCustomerOffice];
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

    delete(customerOffice) {
      let output;
      for (let element of this.customerofficelist){
        if (element.id === customerOffice.id) {
          console.log(element);
          this.saveCurrentCustomerOfficeInstance.delete(element).subscribe(
            res => {
              this.customerofficelist.splice(this.customerofficelist.indexOf(element), 1);
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
