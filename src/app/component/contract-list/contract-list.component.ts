import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contract-list',
  templateUrl: './contract-list.component.html',
  styleUrls: ['./contract-list.component.css']
})
export class ContractListComponent implements OnInit {

  contractList: any[];
  
  constructor() { }

  ngOnInit(): void {
  }

}
