import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddContractDialogComponent } from './modal/add-contract-dialog/add-contract-dialog.component';
import { Router, ActivatedRoute } from '@angular/router';
import { ContractService } from './service/contract.service';

@Component({
  selector: 'app-contract',
  templateUrl: './contract.component.html',
  styleUrls: ['./contract.component.css']
})
export class ContractComponent implements OnInit {

  contractList: any[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    public contractService: ContractService,
  ) { }

  ngOnInit(): void {
    const observer = {
      next: x => {

        this.contractList = x.contractList.data;
      },
      error: erriks => console.log('Observer got an error: ' + JSON.stringify(erriks)),
      complete: () => console.log('Observer got a complete notification'),
    };

    this.route.data.subscribe(observer);
  }

  openDialog() {
    const dialogRef = this.dialog.open(AddContractDialogComponent, {
      width: '600px',
      height: '700px',
      data: {}
    });
    dialogRef.afterClosed().subscribe(
      res => {
        const toAdd = res.data;
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

      }
    );

  }
}
