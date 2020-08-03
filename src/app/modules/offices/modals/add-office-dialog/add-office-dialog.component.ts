import { Component, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { OfficeService } from '../../service/office.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  templateUrl: './add-office-dialog.component.html',
  styleUrls: ['./add-office-dialog.component.css']
})
export class AddOfficeDialogComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public fb: FormBuilder,
    public service: OfficeService,
  ) { }
  officeForm: FormGroup;
  ngOnInit(): void {

  }
  submit(){}
  close(){}
}
