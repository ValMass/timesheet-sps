import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Contract } from '@app/modules/contracts/contract';

@Component({
    selector: 'contract-list',
    templateUrl: 'contract-list.component.html',
})

export class ContractListComponent  {
    @Input() contracts: Contract[];
    // @Output() deleted = new EventEmitter<Customer>();
    // @Output() selected = new EventEmitter<Customer>();
      

    // selectCustomer(customer: Customer) {
    //     this.selected.emit(customer);
    // }

    // deleteCustomer(customer: Customer) {
    //     console.log('emit');
        
    //     this.deleted.emit(customer);
    // }

    trackById(index: number, customer: Contract): number {
        return customer.id;
    }
}