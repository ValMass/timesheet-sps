import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Contract } from '@app/modules/contracts/contract';

@Component({
    selector: 'contract-list',
    templateUrl: 'contract-list.component.html',
    styles:[
        ` @media(max-width:1000px) {
            .card {
              overflow-inline: scroll;
            }
          }

          .table>tbody>tr>td {
            vertical-align: middle;
          }
        `
    ]
})

export class ContractListComponent  {
    @Input() contracts: Contract[];
    @Output() deleted = new EventEmitter<Contract>();
    @Output() selected = new EventEmitter<Contract>();

    //showbutton
    @Output() showButton = new EventEmitter<Boolean>();


    selectContract(contract: Contract) {
        this.showButton.emit(false);
        this.selected.emit(contract);
    }

    deleteContract(contract: Contract) {
        console.log('emit');
        this.deleted.emit(contract);
    }

    trackById(index: number, contract: Contract): number {
        return contract.id;
    }
}
