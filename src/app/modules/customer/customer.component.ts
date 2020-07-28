import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
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
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private customerService: CustomerService) { }

  ngOnInit(): void {
    const observer = {
      next: x => {

        this.customerList = x.customerList.data;
      },
        error: erriks => console.log('Observer got an error: ' + JSON.stringify(erriks)),
        complete: () => console.log('Observer got a complete notification'),
      };

    this.route.data.subscribe(observer);

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
        console.log(res.data);
        this.customerService.createNewCustomer(res).subscribe(
          result => {
            const newCustomer = result['data'];
            console.log(newCustomer);
            let toadd: any = {};
            toadd.id = newCustomer.id;
            toadd.nome = newCustomer.name;
            toadd.legaladdress = newCustomer.legaladdress;
            toadd.piva = newCustomer.pivacodicefiscale;
            toadd.postacertificata = newCustomer.postacertificata;
            toadd.rea = newCustomer.rea;
            toadd.nome = newCustomer.referente;
            this.customerList = [...this.customerList, toadd];
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
        if (result.hasOwnProperty("status") && result['status'] === 'done' ){
          this.customerList.splice(this.customerList.indexOf(customer), 1);
        } else {
          console.log('errore nella cancellazione error from server');

        }
      },
      error => {
        console.log('errore nella cancellazione http error');
      }
    );
  }

}
