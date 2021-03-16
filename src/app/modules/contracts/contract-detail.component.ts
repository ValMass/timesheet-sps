import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, OnChanges } from '@angular/core';
import { Contract } from './contract';
import { Router, NavigationStart } from '@angular/router';

@Component({
  selector: 'contract-detail',
  templateUrl: 'contract-detail.component.html',
  styles: ['select{width:100%}'],
  changeDetection: ChangeDetectionStrategy.OnPush

})

export class ContractDetailComponent implements OnChanges {

  @Input() contract: Contract;
  @Output() unselect = new EventEmitter<string>();
  @Output() save = new EventEmitter<Contract>();

  submitted:boolean;
  addMode = false;
  editingContract: Contract;

  //flag showButton
  @Output() showButton = new EventEmitter<Boolean>();

  constructor(private router:Router) {
    //navigate to list and avoid strange routing behaviour on back click
    // router.events
    //   .subscribe((event: NavigationStart) => {
    //     if (event.navigationTrigger === 'popstate') {
    //       this.router.navigate(['contracts']);
    //     }
    //   });
  }

  ngOnChanges() {

    if (this.contract && this.contract.id) {
      this.editingContract = { ...this.contract };
      this.addMode = false;
      //console.log(this.editingContract);

    } else {
      this.editingContract = { id: undefined, contracttype: '', title: '', level: '', ccnl: '' };
      this.addMode = true;
      //console.log(this.editingContract);

    }
  }

  onSubmit() {
    //console.log('ok');
    this.submitted = true;
    //console.log(this.editingContract);
    this.save.emit(this.editingContract);
    this.clear();
  };

  clear() {
    this.showButton.emit(true);
    this.unselect.emit();
  }

}
