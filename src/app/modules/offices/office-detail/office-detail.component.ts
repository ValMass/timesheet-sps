import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, OnChanges } from '@angular/core';
import { Office } from '../models/office';

@Component({
    selector: 'office-detail',
    templateUrl: 'office-detail.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush

})

export class OfficeDetailComponent implements OnChanges {

    @Input() office:Office;
    @Output() unselect = new EventEmitter<string>();
    @Output() save = new EventEmitter<Office>();

    addMode = false;
    editingOffice: Office;

    constructor() { }

    ngOnChanges() {
        if (this.office && this.office.id) {
            this.editingOffice = { ...this.office };
            this.addMode = false;
          } else {
            this.editingOffice = { id: undefined, address:'',city:'',cap:'' };
            this.addMode = true;
          }
     }

    clear() {
        this.unselect.emit();
      }
    
      saveOffice() {
        this.save.emit(this.editingOffice);
        this.clear();
      }
}