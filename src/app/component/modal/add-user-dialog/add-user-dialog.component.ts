import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-user-dialog',
  templateUrl: './add-user-dialog.component.html',
  styleUrls: ['./add-user-dialog.component.css']
})
export class AddUserDialogComponent implements OnInit {
  profileForm = new FormGroup({
    numeroOre: new FormControl('', [ Validators.required, ]),
    eventDate: new FormControl('', [ Validators.required, ] ),
    contractCode: new FormControl('', [ Validators.required, ])
  });
  constructor() { }

  ngOnInit(): void {
  }

}
