import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Office } from '../models/office';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup, FormControl, } from '@angular/forms';
import { OfficeService } from '../service/office.service';


@Component({
  templateUrl: './office-detail.component.html',
  styleUrls: ['./office-detail.component.css']
})
export class OfficeDetailComponent implements OnInit {

  officeForm: FormGroup;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public fb: FormBuilder,
    public service: OfficeService,
  ) { }

  ngOnInit(): void {

    console.log(history.state);
    const office = new Office();
    office.id = history.state.id;
    office.address = history.state.address;
    office.city = history.state.city;
    office.cap = history.state.cap;
    this.officeForm = this.fb.group({
      id: [office.id],
      address: [office.address],
      city: [office.city],
      cap: [office.cap],

    });


  }

  submit() {
    const office = new Office();
    office.id = this.officeForm.controls.id.value;
    office.address = this.officeForm.controls.address.value;
    office.cap = this.officeForm.controls.cap.value;
    office.city = this.officeForm.controls.city.value;
    console.log(office);
    this.service.update(office).subscribe(
      data => {
        this.router.navigateByUrl('/officelist');
      },

      error => {
        console.log(error);
      }
    );
  }

  close() {
    this.router.navigateByUrl('/officelist');
  }
}
