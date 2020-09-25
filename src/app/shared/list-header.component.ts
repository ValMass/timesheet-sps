import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';

@Component({
    selector: 'list-header',

    template: `
    <button mat-button class="btn btn-primary w-100 mt-5 mb-3" [disabled]="selected" (click)="handleAdd()">{{title}}</button>
    <h1 *ngIf="selected && selected.id">Modifica</h1>
    <h1 *ngIf="selected && !selected.id">Creazione</h1>

    `,

    styles: [
        ` 
        .btn.btn-primary{
          background-color: #962d37;
          border-color: #962d37;
        }
    `
    ]

})
export class ListHeaderComponent implements OnChanges {
    @Input() title: string;
    @Input() selected: any;
    @Output() add = new EventEmitter();
    select: boolean;

    //@Output() refresh = new EventEmitter();

    ngOnChanges() {
        if (this.selected && this.selected.id) {
            this.select = true;
        }
    }

    handleAdd() {
        this.add.emit();
    }

    // handleRefresh() {
    //     this.refresh.emit();
    // }
}
