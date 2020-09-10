import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cust-list',
  templateUrl: './cust-list.component.html',
  styleUrls: ['./cust-list.component.css']
})
export class CustListComponent implements OnInit {
  customerlist: any[] = [];
  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    ) { }

  ngOnInit(): void {
    this.route.data.subscribe(
      result => {
        console.log(result.customerlist.data);
        this.customerlist = result.customerlist.data;
      },
      error => {
        this.customerlist = [];
      },
    );
  }

  redirectToCustomer(customer) {

  }

}
