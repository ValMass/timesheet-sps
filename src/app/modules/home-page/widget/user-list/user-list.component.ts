import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserListComponent implements OnInit {
  userlist: any[];
  constructor(
    private http: HttpClient,
  ) { }

  ngOnInit(): void {
    const observer = {
      next: x => {
        console.log(x.data);
        this.userlist = x.data;
      },
      error: erriks => console.log('Observer got an error: ' + JSON.stringify(erriks)),
      complete: () => console.log('Observer got a complete notification'),
    };

    let id = 1;
    const url = environment.apiUrl + '/user/listAllUsers.php';
    this.http.post(url , { id } ).subscribe(observer);
  }

}
