import { Component, OnInit } from '@angular/core';
import { UserAdmin } from './models/User-admin';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { UserAdminListComponent } from './user-admin-list/user-admin-list.component';
import { UserAdminService } from './services/user-admin.service';


@Component({
  selector: 'app-user-admin',
  templateUrl: './user-admin.component.html',
  styleUrls: ['./user-admin.component.css']
})
export class UserAdminComponent implements OnInit {
  selected: UserAdmin = undefined;
  userListOb: Observable<UserAdmin[]>;
  users: UserAdmin[];
  userToDelete: UserAdmin;
  showModal = false;
  message: string = '';

  constructor(
    private route: ActivatedRoute,
    private userservice: UserAdminService) { }

  ngOnInit(): void {
    const observer = {
      next: x => {
        console.log(x);
        this.users = x.userlist;
      },
      error: err => console.log('Observer got an error: ' + JSON.stringify(err)),
      complete: () => console.log('Observer got a complete notification'),
    };

    this.route.data.subscribe(observer);

  }

  enableAddMode() {

  }

  addCustomer(user: UserAdmin) {
    this.userservice.createNewUser(user);
  }

  save(user: UserAdmin) {
    if (this.selected && this.selected.id) {
      this.update(user);
    } else {
      this.addCustomer(user);
    }
  }

  select(user: UserAdmin) {
    this.selected = user;
  }

  update(user: UserAdmin) {
    this.userservice.createNewUser(user);
  }

  askToDelete(user: UserAdmin) {
    this.userToDelete = user;
    this.showModal = true;
    if (this.userToDelete.id) {
      this.message = `Would you like to delete customer with id:${this.userToDelete.id}?`;
    }
  }
  print() {
    console.log(this.users);
  }
  clear() {
    this.selected = null;
  }
  closeModal(){
    this.showModal = false;
  }
  deleteUserAdmin(){
    this.closeModal();
    if (this.userToDelete) {
      this.userservice.deleteNewUser(this.userToDelete.id)
                .subscribe(
                  res  => {
                    this.userToDelete = null;
                    this.users.splice(this.users.indexOf(res["data"], 1))
                  },
                  error => {

                  });
        }
    this.clear();

  }
}
