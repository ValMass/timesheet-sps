import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { NewUser } from '@app/models/newUser';
import { ActivatedRoute, Router } from '@angular/router';

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
  ) { }

  listautenti: NewUser[] = [];

  ngOnInit(): void {
    const observer = {
      next: x => {
        console.log(x.userlist.data);
        let usArray = x.userlist.data;
        usArray.forEach((element) => {
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
      },
      error: erriks => console.log('Observer got an error: ' + JSON.stringify(erriks)),
      complete: () => console.log('Observer got a complete notification'),
    };

    this.route.data.subscribe(observer);
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
    this.router.navigate(['/timesheet/', user.id]);
  }
}
