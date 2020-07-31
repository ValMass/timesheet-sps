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

  id: number;
  private sub: any;

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


  /*
    contractForm = new FormGroup({
      contractType
    });
  */

  constructor(private route: ActivatedRoute, public fb: FormBuilder) {

  }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
      // In a real app: dispatch action to load the details here.
    });
    console.log('cico' + this.id);
  }

  submitUser() { }
  submitContract() { }
  submitAnag() { }
}
