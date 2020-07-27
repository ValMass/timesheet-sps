import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddContractDialogComponent } from './modal/add-contract-dialog/add-contract-dialog.component';

@Component({
  selector: 'app-contract',
  templateUrl: './contract.component.html',
  styleUrls: ['./contract.component.css']
})
export class ContractComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
  }

  openDialog(){
      const dialogRef = this.dialog.open(AddContractDialogComponent, {
        width: '600px',
        height: '700px',
        data: {}
      });
      /*dialogRef.afterClosed().subscribe(
        res => {
          //this.saveCurrentUserInstance.save(res).subscribe(
          //  result => {

              //const newUser = result['data'];
              //this.userlist = [...this.userlist, newUser];
            //},
            //error => {
            //  console.log('errore');
            //  console.log(error);

           // }
          //);
          console.log(res);
        },
        error => {
          console.log(error);
        });
    }*/
  }
}
