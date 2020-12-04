import { AuthenticationService } from '@app/services/authentication.service';
import { map } from 'rxjs/operators';
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
  public dayWorkedThisMonth = 0;
  public daySmartWorkThisMonth = 0;
  public deseaseThisMonth = 0;
  public permessiThisMonth = 0;
  public userid = 0;
  public year = 0;
  public month = 0;
  public anagId = 0;
  public anag: Anag;
  public workedForCustomerList = new Map<any, any>();

  //Straordinari 
  public oreStraordinarie : number = 0;
  public oreNottStraordinarie : number = 0;
  public oreFestStraordinarie : number = 0;
  
  //TODO il dato che arriva dal backend si chiama "holydaysday"
  public holydayhours : number = 0;

  constructor(
    private statsUserService: StatsUserService,
    private authenticationService :AuthenticationService 
  ) { }

  ngOnInit(): void {
    this.userid = this.getIdFromLocalStorage();
    this.year = this.getCurrentYear();
    this.month = this.getCurrentMonth();
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
      result => { console.log("result data ", result)
        if ( result['status'] === "done" ){
          console.log(result['data']);
          result['data'].forEach(element => {
            console.log(element['month']);
            console.log(this.getCurrentMonth());

            if ( Number(element['month']) === this.getCurrentMonth() ) {
              const eventlist = JSON.parse(element['dayjson']);
              //console.log('element' , element)
              //console.log('element' , element.workedhours)
              this.workedThisMonth = element["workedhours"];
              this.permessiThisMonth = element["permessihours"];
              this.deseaseThisMonth = element["deseaseday"];
              this.dayWorkedThisMonth = element["workeddays"];
              this.daySmartWorkThisMonth = element["smartworkday"];
              this.oreStraordinarie = element["overtime"];
              this.oreNottStraordinarie = element["nightovertime"];
              this.oreFestStraordinarie = element["festalovertime"];
              this.holydayhours = element["holiydaysday"];

              eventlist.forEach(element => {
                if ( element.activityId ){
                  const newore = this.workedForCustomerList.get(element.activityId);
                  const newNumeroOre = newore + element.numOre;
                  this.workedForCustomerList.set(element.activityId ,newNumeroOre);
                }

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
    console.log("IDAUTH" , this.authenticationService.currentUserValue.id)
    console.log("AUTH" , this.authenticationService.currentUserValue)
    //const tmp = localStorage.getItem('currentUser');
    //const tmpArray = JSON.parse(tmp);
    //return tmpArray.id;
    return this.authenticationService.currentUserValue.id;
  }

  getAnagIdFromLocalStorage() {
    console.log("ANAGIDAUTH" , this.authenticationService.currentUserValue.anagraphicid)
    console.log("ANAGAUTH" , this.authenticationService.currentUserValue)
    //const tmp = localStorage.getItem('currentUser');
    //const tmpArray = JSON.parse(tmp);
    //return tmpArray.anagraphicid;
    return this.authenticationService.currentUserValue.anagraphicid;
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
