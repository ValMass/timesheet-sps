import { Component, OnInit } from '@angular/core';
import { UserListComponent } from './widget/user-list/user-list.component';
import { CustListComponent } from './widget/cust-list/cust-list.component';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
