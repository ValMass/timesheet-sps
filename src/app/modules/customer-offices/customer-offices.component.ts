import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-customer-offices',
  templateUrl: './customer-offices.component.html',
  styleUrls: ['./customer-offices.component.css']
})
export class CustomerOfficesComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute,) { }

  ngOnInit(): void {
    console.log(history.state);
  }

}
