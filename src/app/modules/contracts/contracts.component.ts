import { Component, OnInit } from '@angular/core';
import { Contract } from './contract';
import { ContractService } from '../contract/service/contract.service';
import { MatDialog } from '@angular/material/dialog';
import { AddContractDialogComponent } from '../contract/modal/add-contract-dialog/add-contract-dialog.component';

@Component({
    selector: 'contracts',
    templateUrl: 'contracts.component.html'
})

export class ContractsComponent implements OnInit {

    selected: Contract;
    contracts: Contract[];
    showModal = false;
    // message: string = '';

    constructor(private contractService: ContractService,
        public dialog: MatDialog,

        ) { }

    ngOnInit() {

        this.getContracts();
    }

    getContracts() {

        //this.clear();        
        this.contractService.getAllContracts().subscribe(data => {

            this.contracts = data['data'];
            console.log(this.contracts);
            
        },
            err => {
                console.log(err);

            });
    }

    select(e) {
        console.log('abon');

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
                this.contracts = [...this.contracts, newUser];
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

    askToDelete(e) { }

}