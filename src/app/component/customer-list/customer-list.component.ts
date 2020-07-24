import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {

  customerList: any[];

  constructor(
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    const observer = {
      next: x => {
        this.customerList = x.customerlist.data;
      },
        error: erriks => console.log('Observer got an error: ' + JSON.stringify(erriks)),
        complete: () => console.log('Observer got a complete notification'),
      };

    this.route.data.subscribe(observer);
  }
  ShowOfficesByClient(customer){}
  delete(customer){}
}
