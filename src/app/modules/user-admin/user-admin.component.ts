import { Component, OnInit } from '@angular/core';
import { UserAdmin } from './models/User-admin';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { UserAdminListComponent } from './user-admin-list/user-admin-list.component';
import { UserAdminService } from './services/user-admin.service';
import { MatDialog } from '@angular/material/dialog';
import { UserAdminCreationComponent } from './user-admin-creation/user-admin-creation.component';
import { ToastrService } from 'ngx-toastr';


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
  message = '';

  constructor(
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private userAdminService: UserAdminService,
    private toastrService: ToastrService
  ) { }

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

  openDialog() {
    const dialogRef = this.dialog.open(UserAdminCreationComponent, {
      width: '600px',
      height: '700px',
      data: {}
    });
    dialogRef.afterClosed().subscribe(
      res => {
        this.userAdminService.createNewUser(res).subscribe(
          result => {
            console.log(result);
            if (result['status'] === 'error') {
              this.toastrService.error(result['message']);
              return;
            } else {

              let user = result['data'];
              const newUser = new UserAdmin();
              newUser.username = user["username"];
              newUser.password = user["password"];
              newUser.email = user["email"];
              newUser.role = user["role"];
              newUser.regnuminps = user["regnuminps"];
              newUser.regnumsps = user["regnumsps"];
              newUser.userscreationdate = new Date().toString();
              console.log(newUser);
              this.users = [...this.users, newUser];

            }

            //newUser.id = result[];
            //newUser.email
            //newUser.password
            //newUser.role
            //newUser.userscreationdate
            //newUser.anagraphicid
            //newUser.regnuminps
            //newUser.regnumsps
            //this.users = [...this.users, newUser];
            //console.log(this.users);
          },
          error => {
            console.log('errore');
            console.log(error);

          }
        );
        console.log(res);
      },
      error => {
        console.log(error);
      });
  }


  addCustomer(user: UserAdmin) {
    // this.userservice.createNewUser(user);
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
    // this.userservice.createNewUser(user);
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
  closeModal() {
    this.showModal = false;
  }


  deleteUserAdmin() {
    this.closeModal();
    if (this.userToDelete) {
      this.userAdminService.deleteNewUser(this.userToDelete.id)
        .subscribe(
          res => {
            this.users = this.users.filter(obj => obj !== this.userToDelete);
            this.userToDelete = null;
            this.toastrService.success(' Utente cancellato ');

          },
          error => {
            console.log(error);
            this.toastrService.success('Errore nella cancellazione');
          });
    }
    this.clear();

  }
}
