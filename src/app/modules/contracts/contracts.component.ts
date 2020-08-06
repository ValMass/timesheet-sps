import { Component, OnInit } from '@angular/core';
import { Contract } from './contract';
import { ContractService } from './contract.service';
import { MatDialog } from '@angular/material/dialog';
import { AddContractDialogComponent } from '../contract/modal/add-contract-dialog/add-contract-dialog.component';
import { ToastrService } from 'ngx-toastr';


@Component({
    selector: 'contracts',
    templateUrl: 'contracts.component.html'
})

export class ContractsComponent implements OnInit {

    selected: Contract;
    contracts: Contract[];
    showModal = false;
    contractToDelete: Contract;
    message: string = '';

    constructor(private contractService: ContractService,
        public dialog: MatDialog,
        private toastrService: ToastrService
    ) { }

    ngOnInit() {

        this.getContracts();
    }

    //used in save()
    addContract(contract: Contract) {
        this.contractService.createNewContract(contract);
    }

    enableAddMode() {
        this.selected = <any>{};

    }

    askToDelete(contract: Contract) {
        this.contractToDelete = contract;
        this.showModal = true;
        if (this.contractToDelete.id) {
            this.message = `Would you like to delete customer with id:${this.contractToDelete.id}?`;
        }
    }

    clear() {
        this.selected = null;
    }

    closeModal() {
        this.showModal = false;
    }

    deleteContract() {
        this.closeModal();
        if (this.contractToDelete) {
            this.contractService
                .deleteContract(this.contractToDelete.id)
                .subscribe((data) => {(this.contractToDelete = null)
                    this.toastrService.info('utente cancellato');
                },err=>{
                    console.log(err);
                    this.toastrService.warning('operazione non riuscita');
                });
        }
        this.clear();
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

    save(contract:Contract) {
        if (this.selected && this.selected.id) {
            this.update(contract);
        } else {
            this.addContract(contract);
        }
    }

    select(contract: Contract) {
        this.selected = contract;
    }

    update(contract: Contract) {
        console.log(contract);
        
        this.contractService.updateContract(contract).subscribe((data) => {
            console.log(data);
            
            this.toastrService.success('modifica effettuata');
        }, err => {
            console.log(err);
            this.toastrService.error('operazione non riuscita');
        }
        );
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
                this.contractService.createNewContract(toAdd).subscribe(
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


}