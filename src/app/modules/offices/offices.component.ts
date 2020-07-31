import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Office } from './models/office';
import { AddOfficeDialogComponent } from './modals/add-office-dialog/add-office-dialog.component';

@Component({
  selector: 'app-offices',
  templateUrl: './offices.component.html',
  styleUrls: ['./offices.component.css']
})
export class OfficesComponent implements OnInit {

  officeList: Office[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
    //private saveCurrentUserInstance: UserService
  ) { }

  ngOnInit(): void {
    const observer = {
      next: x => {
        this.officeList = x.officelist.data;
      },
        error: erriks => console.log('Observer got an error: ' + JSON.stringify(erriks)),
        complete: () => console.log('Observer got a complete notification'),
      };

    this.route.data.subscribe(observer);
  }

  officeSelected(office){
    const ciccio = { state: { id: office.id , } };
    this.router.navigateByUrl('officelist/office-detail/' + office.id , ciccio);
  }

  deleteOffice(office){

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
}
