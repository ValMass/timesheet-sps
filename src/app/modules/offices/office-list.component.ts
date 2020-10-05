import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Office } from './models/office';


@Component({
    selector: 'office-list',
    templateUrl: 'office-list.component.html',
    styles: [`
    @media(max-width:700px) {
        .card {
            overflow-inline: scroll;
            }
        }
    .table>tbody>tr>td {
            vertical-align: middle;
        }
    `]
})

export class OfficeListComponent {
    @Input() offices: Office[];
    @Output() deleted = new EventEmitter<Office>();
    @Output() selected = new EventEmitter<Office>();
    @Output() associate = new EventEmitter<Office>();

    //showbutton
    @Output() showButton = new EventEmitter<Boolean>();

    selectOffice(office: Office) {
        this.showButton.emit(false);
        this.selected.emit(office);
    }

    deleteOffice(office: Office) {
        console.log('emit');

        this.deleted.emit(office);
    }

    chooseOffice(office: Office) {
        //here you should pass office down
        console.log('associate office');
        this.associate.emit(office);
    }

    trackById(index: number, office: Office): number {
        return office.id;
    }
}
