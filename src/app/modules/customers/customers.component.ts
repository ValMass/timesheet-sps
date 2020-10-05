import { Component, OnInit } from '@angular/core';
import { CustomerService } from './customer.service';
import { Customer } from '@app/modules/customers/customer';
import { ToastrService } from 'ngx-toastr';
import { Office } from '@app/models/office';
import { AcDialogComponent } from './ac-dialog/ac-dialog.component';


@Component({
  selector: 'customers',
  templateUrl: 'customers.component.html'
})

export class CustomersComponent implements OnInit {

  selected: Customer = undefined;
  //customers$: Observable<Customer[]>;
  customers: Customer[];
  offices: Office[];
  customerToDelete: Customer;
  customerToAssociate: Customer;
  showModal = false;
  showAcModal = false;
  message: string = '';

  //showbutton
  showButton : boolean = true;

  //flag showbutton
  changeShowButton(flag){
    this.showButton = flag;
  }

  constructor(
    private customerService: CustomerService,
    private toastrService: ToastrService,
    // private dialog:
  ) {
    // this.customers$ = customerService.getAllCustomers();

  }

  ngOnInit() {
    // console.log(this.customers);
    this.getCustomers();
    //this.getOffices();
  }

  //used in save()
  addCustomer(customer: Customer) {
    this.customerService.createNewCustomer(customer).subscribe(data => {
      console.log(data);
      this.toastrService.success('cliente aggiunto');
      const newCustomer = data['data'];
      this.customers.push(newCustomer)
    }, err => {
      console.log(err);
      this.toastrService.error('operazione non riuscita');

    });
  }

  enableAddMode() {
    this.selected = <any>{};
  }

  askToDelete(customer: Customer) {
    this.customerToDelete = customer;
    this.showModal = true;
    if (this.customerToDelete.id) {
      this.message = `Would you like to delete customer with id:${this.customerToDelete.id}?`;
    }
  }

  clear() {
    this.selected = null;
  }

  closeModal() {
    this.showModal = false;
  }

  deleteCustomer() {
    this.closeModal();
    if (this.customerToDelete) {
      this.customerService
        .deleteCustomer(this.customerToDelete.id)
        .subscribe((data) => {
          this.customers = this.customers.filter(contract => contract !== this.customerToDelete);
          (this.customerToDelete = null);
          this.toastrService.warning('utente cancellato');
        }, err => {
          console.log(err);
          this.toastrService.error('operazione non riuscita');
        });
    }
    this.clear();
  }


  getCustomers() {
    this.clear();
    this.customerService.getAllCustomers().subscribe(data => {
      this.customers = data['data'];
      console.log(this.customers);

    },
      err => {
        console.log(err);
      });
  }

  // getOffices() {

  //     this.clear();
  //     this.customerService.getAllCustomers().subscribe(data => {

  //         this.customers = data['data'];
  //     },
  //         err => {
  //             console.log(err);

  //         });

  // }

  save(customer: Customer) {
    console.log(customer);

    if (this.selected && this.selected.id) {
      this.update(customer, this.selected);
    } else {
      this.addCustomer(customer);
    }
  }

  select(customer: Customer) {
    this.selected = customer;
  }

  update(customer: Customer, oldValue: Customer) {
    console.log(customer);

    this.customerService.updateCustomer(customer).subscribe((data) => {
      console.log(data);
      const customerUpdated = data['data'];
      const index = this.customers.indexOf(oldValue);
      this.customers.splice(index, 1, customerUpdated);
      this.toastrService.success('modifica effettuata');
    }, err => {
      console.log(err);
      this.toastrService.error('operazione non riuscita');
    }
    );
  }

  associateOffice(customer:Customer) {
    // const dialogRef = this.dialog.open(AcDialogComponent, {
    //   width: '20rem',
    // });
    this.showAcModal = true;
    this.customerToAssociate=customer;
  }

}
