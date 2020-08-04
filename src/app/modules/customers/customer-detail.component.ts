import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, OnChanges } from '@angular/core';
import { Customer } from '@app/models/customer';

@Component({
    selector: 'customer-detail',
    templateUrl: 'customer-detail.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush

})

export class CustomerDetailComponent implements OnChanges {

    @Input() customer:Customer;
    @Output() unselect = new EventEmitter<string>();
    @Output() save = new EventEmitter<Customer>();

    addMode = false;
    editingCustomer: Customer;

    constructor() { }

    ngOnChanges() {
        if (this.customer && this.customer.id) {
            this.editingCustomer = { ...this.customer };
            this.addMode = false;
          } else {
            this.editingCustomer = { id: undefined, name: '',legaladdress:'',pivacodicefiscale:'' };
            this.addMode = true;
          }
     }

    clear() {
        this.unselect.emit();
      }
    
      saveCustomer() {
        this.save.emit(this.editingCustomer);
        this.clear();
      }
}