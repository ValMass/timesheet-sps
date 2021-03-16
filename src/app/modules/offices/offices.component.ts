import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  offices: Office[];
  officeToDelete: Office;
  showModal = false;
  message: string = '';
  addMode: boolean = false;
  //showbutton
  showButton : boolean = true;

  //flag showbutton
  changeShowButton(flag){
    this.showButton = flag;
  }


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
  }

  // officeSelected(office) {
  //   const ciccio = { state: { id: office.id, address: office.address, city: office.city, cap: office.cap } };
  //   this.router.navigateByUrl('officelist/office-detail/' + office.id, ciccio);
  // }

  openDialog() {
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

  //used in save()
  addOffice(office: Office) {
    //console.log(office);
    this.officeService.createNewOffice(office).subscribe(data => {
      //console.log(data);
      this.toastrService.success('ufficio aggiunto');
      const newOffice = data['data'];
      this.offices.push(newOffice)

    }, err => {
      //console.log(err);
      this.toastrService.error('operazione non riuscita')

    });
  }

  enableAddMode() {
    this.selected = <any>{};
  }

  askToDelete(office: Office) {
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
        .subscribe((data) => {
          this.offices = this.offices.filter(office => office !== this.officeToDelete);
          (this.officeToDelete = null);
          this.toastrService.warning('utente cancellato');
        }, err => {
          //console.log(err);
          this.toastrService.error('operazione non riuscita');
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
        //console.log(err);

      });

  }

  save(office: Office) {
    //console.log(office);

    if (this.selected && this.selected.id) {
      this.update(office, this.selected);
    } else {
      this.addOffice(office);
    }
  }

  select(office: Office) {
    this.selected = office;
  }

  update(office: Office, oldValue: Office) {
    //console.log(office);
    this.officeService.updateOffice(office).subscribe((data) => {
      //console.log(data);
      //refresh the list with updated values
      const officeUpdated = data['data'];
      const index = this.offices.indexOf(oldValue);
      this.offices.splice(index, 1, officeUpdated);
      this.toastrService.success('modifica effettuata');
    }, err => {
      //console.log(err);
      this.toastrService.error('operazione non riuscita');
    }
    );
  }

}
