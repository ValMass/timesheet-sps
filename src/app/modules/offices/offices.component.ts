import { Component, OnInit } from '@angular/core';
import {  ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Office } from './models/office';
import { AddOfficeDialogComponent } from './modals/add-office-dialog/add-office-dialog.component';
import { ToastrService } from 'ngx-toastr';
import { OfficeService } from './service/office.service';


@Component({
  selector: 'app-offices',
  templateUrl: './offices.component.html',
  styleUrls: ['./offices.component.css']
})
export class OfficesComponent implements OnInit {

  officeList: Office[];

  selected: Office = undefined;
  // offices$: Observable<Office[]>;
  offices:Office[];
  officeToDelete: Office;
  showModal = false;
  message: string = '';
  addMode:boolean=false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
    private officeService: OfficeService,
    private toastrService: ToastrService
    //private saveCurrentUserInstance: UserService
  ) { }

  ngOnInit(): void {
    // const observer = {
    //   next: x => {
    //     this.officeList = x.officelist.data;
    //   },
    //     error: erriks => console.log('Observer got an error: ' + JSON.stringify(erriks)),
    //     complete: () => console.log('Observer got a complete notification'),
    //   };

    // this.route.data.subscribe(observer);
      // console.log(this.customers);
      this.getOffices();
      //this.getOffices();
  }

  officeSelected(office){
    const ciccio = { state: { id: office.id , address: office.address, city: office.city, cap: office.cap } };
    this.router.navigateByUrl('officelist/office-detail/' + office.id , ciccio);
  }

  openDialog(){
    const dialogRef = this.dialog.open(AddOfficeDialogComponent, {
      width: '600px',
      height: '700px',
      data: {}
    });
    dialogRef.afterClosed().subscribe(
      res => {
        /*const toAdd = res.data;
        this.contractService.addContract(toAdd).subscribe(
          result => {

            const newUser = result['data'];
            this.contractList = [...this.contractList, newUser];
          },

        );
        //this.saveCurrentUserInstance.save(res).subscribe(
        //  result => {

        //const newUser = result['data'];
        //this.userlist = [...this.userlist, newUser];
        //},
        //error => {
        console.log(res);
        //  console.log(error);
*/
      }
    );
  }

  toast() {
    this.toastrService.success('wow thats great');
  }

  //used in save()
  addOffice(office: Office) {
    this.officeService.createNewOffice(office);
  }

  enableAddMode() {
    this.selected = <any>{};
    this.addMode=true;
  }

  askToDelete(office:Office) {
    this.officeToDelete = office;
    this.showModal = true;
    if (this.officeToDelete.id) {
      this.message = `Would you like to delete customer with id:${this.officeToDelete.id}?`;
    }
  }

  
    clear() {
        this.selected = null;
    }

    closeModal() {
        this.showModal = false;
    }

    deleteOffice() {
        this.closeModal();
        if (this.officeToDelete) {
            this.officeService
                .deleteOffice(this.officeToDelete.id)
                .subscribe((data) => {(this.officeToDelete = null)
                    this.toastrService.info('utente cancellato');
                },err=>{
                    console.log(err);
                    this.toastrService.warning('operazione non riuscita');
                });
        }
        this.clear();
    }

    getOffices() {

        this.clear();
        this.officeService.getAllOffices().subscribe(data => {

            this.offices = data['data'];
        },
            err => {
                console.log(err);

            });

    }

    save(office: Office) {
        if (this.selected && this.selected.id) {
            this.update(office);
        } else {
            this.addOffice(office);
        }
    }

    select(office: Office) {
        this.selected = office;
    }

    update(office: Office) {
        console.log(office);
        
        this.officeService.updateOffice(office).subscribe((data) => {
            console.log(data);
            
            this.toastrService.success('modifica effettuata');
        }, err => {
            console.log(err);
            this.toastrService.error('operazione non riuscita');
        }
        );
    }

}
