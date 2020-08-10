import { Component, OnInit, Input } from '@angular/core';
import { CustomerService } from '../customer.service';
import { Customer } from '../customer';

@Component({
    selector: 'ac-dialog',
    templateUrl: 'ac-dialog.component.html',
    styles: [`.modal{

        background-color: rgb(0,0,0); /* Fallback color */
        background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
      
        }`]
})

export class AcDialogComponent implements OnInit {

    @Input() customer: Customer;
    @Input() isOpen = false;
    offices = ['dino'];

    constructor(private customerService: CustomerService) { }


    ngOnInit() {
        if (this.customer) {
            console.log(this.customer.id);

            this.customerService.listAllCustomerOfficesByCustomerId(this.customer.id).subscribe(
                data => console.log(data)

            )
        }

    }

    onSubmit() {
        console.log('si');

    }
    associateOffice() {

    }

    close() {
        this.isOpen = false;
    }
}