import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  templateUrl: './office-detail.component.html',
  styleUrls: ['./office-detail.component.css']
})
export class OfficeDetailComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {

    console.log(history.state);
  }

}
