import { Anagraphic } from './models/Anagraphic';
import { Component, OnInit } from '@angular/core';
import { UserAdmin } from './models/User-admin';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { UserAdminListComponent } from './user-admin-list/user-admin-list.component';
import { UserAdminService } from './services/user-admin.service';
import { MatDialog } from '@angular/material/dialog';
import { UserAdminCreationComponent } from './user-admin-creation/user-admin-creation.component';
import { ToastrService } from 'ngx-toastr';
import { AnagraphicService } from './services/anagraphic.service';


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
    private anagraphicService: AnagraphicService,
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
    const viewDate = new Date();
    const month = viewDate.getMonth();
    const year = viewDate.getFullYear();
    console.log(month + ' ' + year);
    this.userAdminService.getListForUserList( month, year).subscribe(
      res => {
        if (res.status === "done" ) {
          this.users = res.data;
        }
      }
    );
  }
  parseDialogFormRes(dialogRes) {

    let tmpuser = new UserAdmin();
    tmpuser.username = dialogRes['username'];
    tmpuser.password = dialogRes['password'];
    tmpuser.email = dialogRes['email'];
    tmpuser.role = dialogRes['role'];
    tmpuser.regnuminps = dialogRes['regnuminps'];
    tmpuser.regnumsps = dialogRes['regnumsps'];
    tmpuser.userscreationdate = new Date().toString();
    let tmpanag = new Anagraphic();
    tmpanag.name = dialogRes['name'];
    tmpanag.surname = dialogRes['surname'];
    tmpanag.birthdate = dialogRes['birthdate'];
    tmpanag.address = dialogRes['address'];
    tmpanag.phonenumber1 = dialogRes['phonenumber1'];
    tmpanag.phonenumber2 = dialogRes['phonenumber2'];
    return { usertoadd: tmpuser, anagtoadd: tmpanag };
  }

  openDialog() {
    const dialogRef = this.dialog.open(UserAdminCreationComponent, {
      width: '800px',
      height: '700px',
      data: {}
    });
    dialogRef.afterClosed().subscribe(
      res => {
        let myObj = this.parseDialogFormRes(res['data']);
        console.log(myObj);
        this.anagraphicService.addAnagraphicForUser(myObj.anagtoadd).subscribe(
          next => {
            console.log(next);
            if (next['status'] === 'error') {
              this.toastrService.error(res.toString());
            } else {
              myObj.usertoadd.anagraphicid = next['data'].id;
              this.userAdminService.createNewUser(myObj.usertoadd).subscribe(
                result => {
                  if (result['status'] === 'error') {
                    this.toastrService.error(result['message']);
                    return;
                  } else {
                    let user = result['data'];
                    const newUser = new UserAdmin();
                    newUser.id = user['id'];
                    newUser.username = user['username'];
                    newUser.password = user['password'];
                    newUser.email = user['email'];
                    newUser.role = user['role'];
                    newUser.regnuminps = user['regnuminps'];
                    newUser.regnumsps = user['regnumsps'];
                    newUser.userscreationdate = new Date().toString();
                    newUser.anagraphicid = result['data'].id;
                    newUser.phonenumber1 = next['phonenumber1'];
                    newUser.phonenumber2 = next['phonenumber2'];
                    console.log(newUser);
                    this.users = [...this.users, newUser];
                  }
                });
            }
          },
          error => {
            this.toastrService.error('Errore http');
          }
        );
      }
    );

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
    console.log(user);
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
      console.log(this.userToDelete);
      this.anagraphicService.deleteAnagraphic(this.userToDelete.anagraphicid).subscribe(
        delres => {
          this.userAdminService.deleteNewUser(this.userToDelete.id)
            .subscribe(
              res => {
                this.users = this.users.filter(obj => obj !== this.userToDelete);
                this.userToDelete = null;
                this.toastrService.success(' Utente cancellato ');

              },
              error => {
                console.log(error);
                this.toastrService.error('Errore nella cancellazione');
              });
        },
        error => {
          this.userAdminService.deleteNewUser(this.userToDelete.id)
            .subscribe(
              res => {
                this.users = this.users.filter(obj => obj !== this.userToDelete);
                this.userToDelete = null;
                this.toastrService.success(' Utente cancellato ');

              },
              error => {
                console.log(error);
                this.toastrService.error('Errore nella cancellazione');
              });
          this.toastrService.error('Errore http');
        }
      );

    }
    this.clear();

  }
}
