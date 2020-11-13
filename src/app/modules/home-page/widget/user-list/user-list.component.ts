import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { NewUser } from '@app/models/newUser';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicesService } from '../../services/services.service';
import { AuthenticationService } from '@app/services/authentication.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class UserListComponent implements OnInit {

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private service: ServicesService,
    private authenticationService: AuthenticationService,
  ) { }
  viewDate: Date = new Date();

  listautenti: any[] = [];

  ngOnInit(): void {
    const loggeduser = this.authenticationService.currentUserValue;
    const month = this.viewDate.getMonth();
    const year = this.viewDate.getFullYear();
    this.service.getListForAdminHomepage(month, year, loggeduser.role).subscribe(
      res => {
        if ( res.status === "done"){
          this.listautenti = res.data;
        }
        console.log(res);
      }
    );
/*
    let id = 1;
    const url = environment.apiUrl + '/user/listAllUsers.php';
    this.http.post(url, { id }).subscribe(
      (res) => {
        console.log(res['data']);
        const realres = res['data'];


        realres.forEach((element) => {
          console.log(element);
          const newElement = new NewUser();
          newElement.id = element.id;
          newElement.password = element.password;
          newElement.anagraphicid = element.anagraphicid;
          newElement.email = element.email;
          newElement.regnuminps = element.regnuminps;
          newElement.regnumsps = element.regnumsps;
          newElement.role = element.role;
          newElement.token = element.token;
          newElement.tokencreationdate = element.tokencreationdate;
          newElement.username = element.username;
          newElement.userscreationdate = element.userscreationdate;

          this.listautenti = [...this.listautenti, newElement];
        });
        this.listautenti = [...this.listautenti];
      }
    );

*/
  }

  trackById(index: number, item: NewUser) {
    return item.id;
  }

  print() {
    console.log(this.listautenti);
  }

  redirectToUser(user){
    //const url = environment.apiUrl
    if(user.role == "0" || user.role == "1" ){
      return;
    } else {
      this.router.navigate(['/timesheet/', user.id]);
    }

  }
}
