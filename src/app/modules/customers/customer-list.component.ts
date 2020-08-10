import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Customer } from '@app/modules/customers/customer';

@Component({
    selector: 'customer-list',
    templateUrl: 'customer-list.component.html',
    styles: [`
    @media(max-width:1200px){
        .card{
            overflow-inline:scroll;
        }
    }
    `]
})

export class CustomerListComponent {
    @Input() customers: Customer[];
    @Output() deleted = new EventEmitter<Customer>();
    @Output() selected = new EventEmitter<Customer>();
    @Output() associate = new EventEmitter<Customer>();


    selectCustomer(customer: Customer) {
        this.selected.emit(customer);
    }

    deleteCustomer(customer: Customer) {
        console.log('emit');

        this.deleted.emit(customer);
    }

    chooseOffice(customer: Customer) {
        //here you should pass office down
        console.log('associate office');
        this.associate.emit(customer);

    }

    trackById(index: number, customer: Customer): number {
        return customer.id;
    }
}