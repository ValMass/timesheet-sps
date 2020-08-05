import { Component, OnInit, ChangeDetectionStrategy, Input, EventEmitter, Output } from '@angular/core';
import { UserAdmin } from '../models/User-admin';
import { FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-user-admin-detail',
  templateUrl: './user-admin-detail.component.html',
  styleUrls: ['./user-admin-detail.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserAdminDetailComponent implements OnInit {
  @Input() userAdmin: UserAdmin;
  @Output() unselect = new EventEmitter<string>();
  @Output() save = new EventEmitter<UserAdmin>();

  addMode = false;
  editingUser: UserAdmin;

  userForm = new FormGroup({
    username: new FormControl('', [Validators.required,]),
    password: new FormControl('', [Validators.required,]),
    numeroinps: new FormControl('', [Validators.required,]),
    numerosps: new FormControl('', [Validators.required,]),
    email: new FormControl('', [Validators.required,]),
  });

  anagForm = new FormGroup({
    name: new FormControl('', [Validators.required,]),
    surname: new FormControl('', [Validators.required,]),
  });

  contractForm = new FormGroup({
    contracttype: new FormControl('', [Validators.required,]),
    startingfrom: new FormControl('', [Validators.required,]),
  });
constructor() { }

ngOnInit(): void {
}

clear() {
  this.unselect.emit();
}

saveCustomer() {
  this.save.emit(this.editingUser);
  this.clear();
}
submitUser(){}
submitAnag(){}
submitContract(){}
}
