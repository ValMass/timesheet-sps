import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../customer/services/customer.service';
import { Customer } from '@app/modules/customers/customer';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';


@Component({
    selector: 'customers',
    templateUrl: 'customers.component.html'
})

export class CustomersComponent implements OnInit {

    selected: Customer = undefined;
    customers$: Observable<Customer[]>;
    customers: Customer[];
    customerToDelete: Customer;
    showModal = false;
    message: string = '';

    constructor(private customerService: CustomerService,
        private toastrService: ToastrService
    ) {
        // this.customers$ = customerService.getAllCustomers();
    }

    ngOnInit() {
        // this.customers=this.getCustomers();
        // console.log(this.customers);
        // this.getCustomers();
        // console.log(this.customers);
        this.getCustomers();

    }

    toast() {
        this.toastrService.success('wow thats great')
    }

    //used in save()
    addCustomer(customer: Customer) {
        this.customerService.createNewCustomer(customer);
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
                .subscribe((data) => {(this.customerToDelete = null)
                    this.toastrService.info('utente cancellato');
                },err=>{
                    console.log(err);
                    this.toastrService.warning('operazione non riuscita');
                });
        }
        this.clear();
    }

    getCustomers() {

        this.clear();
        this.customerService.getAllCustomers().subscribe(data => {

            this.customers = data['data'];
        },
            err => {
                console.log(err);

            });

    }

    save(customer: Customer) {
        if (this.selected && this.selected.id) {
            this.update(customer);
        } else {
            this.addCustomer(customer);
        }
    }

    select(customer: Customer) {
        this.selected = customer;
    }

    update(customer: Customer) {
        this.customerService.updateCustomer(customer).subscribe((data) => {
            this.toastrService.success('modifica effettuata');
        }, err => {
            console.log(err);
            this.toastrService.warning('operazione non riuscita');
        }
        );
    }

    associateOffice(e){
        //in this event should be the office emitted from child
        console.log(e);
        
    }

}