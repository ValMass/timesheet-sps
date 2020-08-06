import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, OnChanges } from '@angular/core';
import { Contract } from './contract';

@Component({
    selector: 'contract-detail',
    templateUrl: 'contract-detail.component.html',
    styles:['select{width:100%}'],
    changeDetection: ChangeDetectionStrategy.OnPush

})

export class ContractDetailComponent implements OnChanges {

    @Input() contract:Contract;
    @Output() unselect = new EventEmitter<string>();
    @Output() save = new EventEmitter<Contract>();

    addMode = false;
    editingContract: Contract;

    constructor() { }

    ngOnChanges() {
        if (this.contract && this.contract.id) {
            this.editingContract = { ...this.contract };
            this.addMode = false;
          } else {
            this.editingContract = { id: undefined, contractType: '',title:'',level:'',ccnl:'' };
            this.addMode = true;
          }
     }

    clear() {
        this.unselect.emit();
      }
    
      saveContract() {
        console.log(this.editingContract);
        
        // this.save.emit(this.editingContract);
         this.clear();
      }
}