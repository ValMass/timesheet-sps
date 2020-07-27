import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CustomerService } from './services/customer.service';
import { AddCustomerDialogComponent } from './modal/add-customer-dialog/add-customer-dialog.component';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  customerList: any[];

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private customerService: CustomerService) { }

  ngOnInit(): void {

  }

  ShowOfficesByCustomer(customer){
    const ciccio = { state: { id: 1 , name: 'Angular' } };
    this.router.navigateByUrl('customer/1', ciccio);
  }

  openaddCustomerDialog() {
    const dialogRef = this.dialog.open(AddCustomerDialogComponent, {
      width: '600px',
      height: '550px',
      data: {}
    });
    dialogRef.afterClosed().subscribe(
      res => {
        this.customerService.createNewCustomer(res).subscribe(
          result => {

            //const newUser = result['data'];
            //this.userlist = [...this.userlist, newUser];
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

  deleteCustomer(customer) {
    this.customerService.deleteCustomer(customer).subscribe(
      result => {

      },
      error => {

      }
    );
  }

}
