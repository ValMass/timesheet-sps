import { Component, OnInit } from '@angular/core';
import { StatsUserService } from './services/stats-user.service';
import { Anag } from './models/anag';

@Component({
  selector: 'app-home-page-user',
  templateUrl: './home-page-user.component.html',
  styleUrls: ['./home-page-user.component.css']
})
export class HomePageUserComponent implements OnInit {
  public name = "";
  public surname = "";
  public workedThisMonth = 0;
  public userid = 0;
  public year = 0;
  public anagId = 0;
  public anag: Anag;

  constructor(
    private statsUserService: StatsUserService,
  ) { }

  ngOnInit(): void {
    this.userid = this.getIdFromLocalStorage();
    this.year = this.getCurrentYear();
    this.anagId = this.getAnagIdFromLocalStorage();
    this.statsUserService.getAnagraphicById(this.anagId).subscribe(
      result => {
        if(result['status'] === "done"){
          this.anag = result['data'] as Anag;
          this.name = this.anag.name ;
          this.surname = this.anag.surname;
        } else {
          console.log(result['message']);
        }
      },
      error => {

      }

    );

    this.statsUserService.loadAllEventForThisYear( this.userid, this.year ).subscribe(
      result => {
        if ( result['status'] === "done" ){
          console.log(result['data']);
          result['data'].forEach(element => {
            console.log(element['month']);
            console.log(this.getCurrentMonth());

            if( Number(element['month']) === this.getCurrentMonth() ) {
              const eventlist = JSON.parse(element['dayjson']);
              this.workedThisMonth = element["totalworkedhours"];
              eventlist.forEach(element => {


              });
            }
          });
        } else {
          console.log(result['message']);
        }
      },
      error => {
        console.log("result['message']");
      }

    );

  }

  getIdFromLocalStorage() {
    const tmp = localStorage.getItem('currentUser');
    const tmpArray = JSON.parse(tmp);
    return tmpArray.id;
  }

  getAnagIdFromLocalStorage() {
    const tmp = localStorage.getItem('currentUser');
    const tmpArray = JSON.parse(tmp);
    return tmpArray.anagraphicid;
  }
  getCurrentYear(){
    const date = new Date();
    return date.getFullYear();
  }
  getCurrentMonth(){
    const date = new Date();
    return date.getMonth() ;
  }
}
