import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatExpansionModule, MatExpansionPanelState, MatExpansionPanelTitle } from '@angular/material/expansion';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  userForm = new FormGroup({
    username: new FormControl('', [ Validators.required, ]),
    password: new FormControl('', [ Validators.required, ] ),
    numeroinps: new FormControl('', [ Validators.required, ] ),
    numerosps: new FormControl('', [ Validators.required, ] ),
    email: new FormControl('', [ Validators.required, ] ),
  });

  anagForm = new FormGroup({
    name: new FormControl('', [ Validators.required, ]),
    surname: new FormControl('', [ Validators.required, ]),
  });

  contractForm = new FormGroup({
    contracttype: new FormControl('', [ Validators.required, ]),
    startingfrom: new FormControl('', [ Validators.required, ]),
  });


/*
  contractForm = new FormGroup({
    contractType
  });
*/

  constructor(private route: ActivatedRoute, public fb: FormBuilder) {

  }

  ngOnInit(): void {
  }

  submitUser() {}
  submitContract() {}
  submitAnag() {}
}
