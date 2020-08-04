import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Customer } from '@app/models/customer';

@Component({
    selector: 'customer-list',
    templateUrl: 'customer-list.component.html'
})

export class CustomerListComponent  {
    @Input() customers: Customer[];
    @Output() deleted = new EventEmitter<Customer>();
    @Output() selected = new EventEmitter<Customer>();
      

    selectCustomer(customer: Customer) {
        this.selected.emit(customer);
    }

    deleteCustomer(customer: Customer) {
        console.log('emit');
        
        this.deleted.emit(customer);
    }

    trackById(index: number, customer: Customer): number {
        return customer.id;
    }
}