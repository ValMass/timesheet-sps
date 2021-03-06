import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Contract } from '@app/modules/contracts/contract';

@Component({
    selector: 'contract-list',
    templateUrl: 'contract-list.component.html',
    styles: [
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

export class ContractListComponent {
    @Input() contracts: Contract[];
    @Input() isSuperAdmin : boolean = false
    @Output() deleted = new EventEmitter<Contract>();
    @Output() selected = new EventEmitter<Contract>();

    //showbutton
    @Output() showButton = new EventEmitter<Boolean>();


    selectContract(contract: Contract) {
        this.showButton.emit(false);
        this.selected.emit(contract);
    }

    deleteContract(contract: Contract) {
        //console.log('emit');
        this.deleted.emit(contract);
    }

    trackById(index: number, contract: Contract): number {
        return contract.id;
    }

    mapTipoContratto(toMap) {
        let res = "errore: " + toMap;

        if (toMap == "indet") {
            res = 'Indeterminato'
        }
        if (toMap == "det") {
            res = 'Tempo determinato'
        }
        if (toMap == "parz") {
            res = 'Tempo parziale'
        }
        if (toMap == "appr") {
            res = 'Apprendistato'
        }
        if (toMap == "interm") {
            res = 'Intermittente'
        }
        if (toMap == "somm") {
            res = 'Somministrazione'
        }
        if (toMap == "prog") {
            res = 'CoCoPro'
        }
        if (toMap == "ccc") {
            res = 'CoCoCo'
        }
        if (toMap == "piva") {
            res = 'Partita IVA'
        }
        if (toMap == "Prestocc") {
            res = 'Prestazioni occasionali'
        }
        if (toMap == "Associnpart") {
            res = 'Associazione in partecipazione'
        }
        if (toMap == "arru") {
            res = 'Contratto di arruolamento'
        }
        if (toMap == "tirstage") {
            res = 'Tirocinio'
        }

        return (res)
    }
}
