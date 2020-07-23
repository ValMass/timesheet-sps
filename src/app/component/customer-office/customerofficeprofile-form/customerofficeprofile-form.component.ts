import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-customerofficeprofile-form',
  templateUrl: './customerofficeprofile-form.component.html',
  styleUrls: ['./customerofficeprofile-form.component.css']
})
export class CustomerofficeprofileFormComponent implements OnInit {

  profileForm: FormGroup;

  constructor(private route: ActivatedRoute, public fb: FormBuilder) { }

  ngOnInit() {

    this.route.data.subscribe(
      data => {
      console.log('Data umpa :', data);
      console.log('diobestia :', data.customeroffice );
      console.log('status :', data.customeroffice.status);


      const birth = new Date(data.customeroffice.data.birthdate);


      this.profileForm = this.fb.group({
        firstName: [data.customeroffice.data.name],
        lastName: [data.customeroffice.data.surname],
        address: [data.customeroffice.data.address],

        email: [data.customeroffice.data.birthplace],
        tipologiacontratto: [data.customeroffice.data.contracttype],
        distaccatoa: [data.customeroffice.data.distaccatoa],
        sededilavoro: [data.customeroffice.data.sededilavoro],
        rimborsostimato: [data.customeroffice.data.valorerimborsistimato],
        buonipasto: [data.customeroffice.data.buonipastobool],
      });
    } );
  }

  submit() {
    const name = this.fc.firstName.value;
    const surname = this.fc.lastName.value;

  }

  get fc() { return this.profileForm.controls; }
}
