import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Office } from './models/office';


@Component({
    selector: 'office-list',
    templateUrl: 'office-list.component.html',
    styles: [`
    @media(max-width:1000px){
        .card{
            overflow-inline:scroll;
        }
    }
    `]
})

export class OfficeListComponent {
    @Input() offices: Office[];
    @Output() deleted = new EventEmitter<Office>();
    @Output() selected = new EventEmitter<Office>();
    @Output() associate = new EventEmitter<Office>();

    selectOffice(office: Office) {
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