import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'list-header',

    template: `<button mat-button class="btn btn-primary w-100 mt-5" (click)="handleAdd()">{{title}}</button>`,

    styles: [
        ` 
        .btn.btn-primary{
          background-color: #962d37;
          border-color: #962d37;
        }
    `
    ]

})
export class ListHeaderComponent implements OnInit {
    @Input() title: string;
    @Output() add = new EventEmitter();
    
    //@Output() refresh = new EventEmitter();

    ngOnInit() { }

    handleAdd() {
        this.add.emit();
    }

    // handleRefresh() {
    //     this.refresh.emit();
    // }
}
