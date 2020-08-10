import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, OnChanges, HostListener } from '@angular/core';
import { Customer } from '@app/modules/customers/customer';
import { Router, NavigationStart } from '@angular/router';

@Component({
  selector: 'customer-detail',
  templateUrl: 'customer-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush

})

export class CustomerDetailComponent implements OnChanges {

  @Input() customer: Customer;
  @Output() unselect = new EventEmitter<string>();
  @Output() save = new EventEmitter<Customer>();
  submitted: boolean;
  addMode = false;
  editingCustomer: Customer;

  constructor(private router: Router) {
    //navigate to list and avoid strange routing behaviour on back click
    // router.events
    //   .subscribe((event: NavigationStart) => {
    //     if (event.navigationTrigger === 'popstate') {
    //       console.log('pop');
    //       this.router.navigate(['/customers'],{replaceUrl:true});
    //       //this.editingCustomer = { id: undefined, name: '', legaladdress: '', pivacodicefiscale: '' };

    //     }
    //   });
  }

  // @HostListener('window:popstate', ['$event'])
  // onBrowserBackBtnClose(event: Event) {
  //   console.log('back button pressed');
  //   event.preventDefault();
  //   this.router.navigate(['/customers'], { replaceUrl: true });
  // }

  ngOnChanges() {
    if (this.customer && this.customer.id) {
      this.editingCustomer = { ...this.customer };
      this.addMode = false;
    } else {
      this.editingCustomer = { id: undefined, name: '', legaladdress: '', pivacodicefiscale: '' };
      this.addMode = true;
    }
  }

  onSubmit() {
    console.log('ok');
    this.submitted = true;
    console.log(this.editingCustomer);
    this.save.emit(this.editingCustomer);
    this.clear();
  };

  clear() {
    this.unselect.emit();
  }

}