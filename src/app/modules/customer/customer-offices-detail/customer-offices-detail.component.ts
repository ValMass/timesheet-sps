import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';

@Component({
  templateUrl: './customer-offices-detail.component.html',
  styleUrls: ['./customer-offices-detail.component.css']
})
export class CustomerOfficesDetailComponent implements OnInit {

  constructor(
    private router: Router,
    //private snap: ActivatedRouteSnapshot,
    private route: ActivatedRoute, ) { }

  ngOnInit(): void {
    console.log(history.state);
    //this.snap.paramMap.get('id');

    this.route.data.subscribe(
      data => {

        //console.log(data);
      }
      );
  }

}
