import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, OnChanges } from '@angular/core';
import { Office } from '../models/office';
import { Router, NavigationStart } from '@angular/router';

@Component({
  selector: 'office-detail',
  templateUrl: 'office-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush

})

export class OfficeDetailComponent implements OnChanges {

  @Input() office: Office;
  @Output() unselect = new EventEmitter<string>();
  @Output() save = new EventEmitter<Office>();

  //flag showButton
  @Output() showButton = new EventEmitter<Boolean>();

  submitted:boolean;
  addMode = false;
  editingOffice: Office;

  constructor(private router: Router) {
    //navigate to list and avoid strange routing behaviour on back click
    // router.events
    //   .subscribe((event: NavigationStart) => {
    //     if (event.navigationTrigger === 'popstate') {
    //       this.router.navigate(['offices']);
    //     }
    //   });
  }

  ngOnChanges() {
    if (this.office && this.office.id) {
      this.editingOffice = { ...this.office };
      this.addMode = false;
    } else {
      this.editingOffice = { id: undefined, address: '', city: '', cap: '' };
      this.addMode = true;
    }
  }

  onSubmit() {
    //console.log('ok');
    this.submitted = true;
    //console.log(this.editingOffice);
    this.save.emit(this.editingOffice);
    this.clear();
  };

  clear() {
    this.showButton.emit(true);
    this.unselect.emit();
  }

}
