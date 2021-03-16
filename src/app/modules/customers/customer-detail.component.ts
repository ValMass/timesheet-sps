import { map } from 'rxjs/operators';
import { Office } from './models/office';
import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, OnChanges, HostListener, ChangeDetectorRef } from '@angular/core';
import { Customer } from '@app/modules/customers/customer';
import { Router, NavigationStart } from '@angular/router';
import { CustomerOfficeService } from './services/customer-office.service';
import { ToastrService } from 'ngx-toastr';
import { AddCustomerOfficeComponent } from './components/add-customer-office/add-customer-office.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'customer-detail',
  templateUrl: 'customer-detail.component.html',
})

export class CustomerDetailComponent implements OnChanges {

  @Input() activities : any;
  @Input() customer: Customer;
  @Output() unselect = new EventEmitter<string>();
  @Output() save = new EventEmitter<Customer>();
  submitted: boolean;
  addMode = false;
  editingCustomer: Customer;
  officeslist: any[] = [];
  defaultType:any = "";

    //flag showButton
    @Output() showButton = new EventEmitter<Boolean>();


  constructor(
    private router: Router,
    public dialog: MatDialog,
    private customerOfficesService: CustomerOfficeService,
    private toastrService: ToastrService,
    private cd : ChangeDetectorRef
    ) {
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
      this.getoffices(this.customer.id);
    } else {
      this.editingCustomer = { id: undefined, name: '', legaladdress: '', pivacodicefiscale: '' };
      this.addMode = true;
    }
  }
  getoffices(id){
    this.customerOfficesService.getOfficesByCustomer(id).subscribe(
      result => {

        if (result['status'] === 'error') {

          this.toastrService.error('Errore durante il caricamento degli uffici: ' + result['message']);
        } else {
          this.officeslist = result['data'].map( x => x );
          this.cd.detectChanges();
        /* for (const office of result['data']) {
            console.log(office);
            this.officeslist.push(office);
          }
          console.log(this.officeslist);*/
        }
      }, error => {
        this.toastrService.error('Errore durante il caricamento degli uffici: ' + error);
      }
    );
  }

  aggiungiUfficio() {
    const dialogRef = this.dialog.open(AddCustomerOfficeComponent, {
      width: '800px',
      data: {}
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res && res['data']) {
        this.customerOfficesService.save({...res['data'], customerid: this.customer.id}).subscribe(res => {
          if (res['status'] === 'done') {
            this.toastrService.success('Ufficio creato correttamente');
            this.officeslist.push(res['data']);
          } else {
            this.toastrService.error('Problemi nel creare l\'ufficio');
          }
        });
      }
    });
  }

  modificaUfficio(office) {
    const dialogRef = this.dialog.open(AddCustomerOfficeComponent, {
      width: '800px',
      data: {office: office}
    });
    dialogRef.afterClosed().subscribe(res => {
      this.customerOfficesService.update(res, office.id, office.customerid).subscribe(res => {
        if (res['status'] === 'done') {
          this.toastrService.success('Ufficio modificato correttamente');
          const index = this.officeslist.findIndex(office => office.id === res['data'].id);
          this.getoffices(this.customer.id);
        } else {
          this.toastrService.error('Problemi con la modifica dell\'ufficio');
        }
      });
    });
  }

  eliminaUfficio(office) {
    if (confirm(`Vuoi cancellare l'ufficio ${office.address}`)) {
      this.customerOfficesService.delete(office).subscribe(res => {
        if (res['status'] === 'done') {
          this.toastrService.success('Ufficio cancellato correttamente');
          this.officeslist = this.officeslist.filter(office => {
            return office.id !== res['data'].id;
          });
        } else {
          this.toastrService.error('Problemi nel cancellare l\'ufficio');
        }
      });
    }
  }

  onSubmit() {
    //console.log('ok');
    this.submitted = true;
    //console.log(this.editingCustomer);
    this.save.emit(this.editingCustomer);
    this.clear();
  };

  clear() {
    this.showButton.emit(true);
    this.unselect.emit();
  }

  trackById(index: number, office: Office): number {
    return office.id;
}
}
