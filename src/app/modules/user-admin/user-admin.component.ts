import { EconomicData } from './models/EconomicData';
import { Anagraphic } from './models/Anagraphic';
import { Component, OnInit } from '@angular/core';
import { UserAdmin } from './models/User-admin';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UserAdminListComponent } from './user-admin-list/user-admin-list.component';
import { UserAdminService } from './services/user-admin.service';
import { MatDialog } from '@angular/material/dialog';
import { UserAdminCreationComponent } from './user-admin-creation/user-admin-creation.component';
import { ToastrService } from 'ngx-toastr';
import { AnagraphicService } from './services/anagraphic.service';
import { AuthGuard } from '@app/_helper/auth.guard';
import { FileService } from '@app/shared/services/file.service';
import * as fileSaver from 'file-saver';
import { AuthenticationService } from '@app/services/authentication.service';
import { SavedataLocalStorageService } from '@app/services/savedata-local-storage.service';


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
  showButton: boolean = true;
  globalTimesheetDate : any = {year : null , month : null};
  dataToLoad : Date = new Date();
  mapMonth : any;
  errorRegnuminps  : string = "SQLSTATE[23000]: Integrity constraint violation: 1062 Duplicate entry '15' for key 'regNumInps_UNIQUE";
  constructor(
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private userAdminService: UserAdminService,
    private anagraphicService: AnagraphicService,
    private toastrService: ToastrService,
    private fileservice: FileService,
    private router: Router,
    private authenticationService: AuthenticationService,
    private savedataLocalStorageService : SavedataLocalStorageService
  ) { }

  ngOnInit(): void {
    this.mapMonth =  new Map([
      ["01", 0] , ["02", 1] , ["03", 2] , ["04", 3] , 
      ["05", 4] , ["06", 5] , ["07", 6] , ["08", 7] , 
      ["09", 8] , ["10", 9] , ["11", 10] , ["12", 11] 
    ]);

    this.generateDate();
    const observer = {
      next: x => {
        //console.log(x);
        this.users = x.userlist;
      },
      error: err => console.log('Observer got an error: ' + JSON.stringify(err)),
      complete: () => console.log('Observer got a complete notification'),
    };
    const loggeduser = this.authenticationService.currentUserValue;
    this.route.data.subscribe(observer);
    this.dataToLoad = this.globalTimesheetDate;
    const month = this.globalTimesheetDate.month;
    const year = this.globalTimesheetDate.year;
    this.userAdminService.getListForUserList(month, year, loggeduser.role).subscribe(
      res => {
        if (res.status === "done") {
          this.users = res.data;
        }
      }
    );
  }

  parseDialogFormRes(dialogRes) {
    //console.log("preparse ", dialogRes);
    let tmpuser = new UserAdmin();
    tmpuser.username = dialogRes['username'];
    tmpuser.password = dialogRes['password'];
    tmpuser.email = dialogRes['email'];
    tmpuser.role = dialogRes['isadmin'];
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
    tmpanag.sededilavoro = dialogRes['sededilavoro'];
    tmpanag.birthplace = dialogRes['birthplace'];
    tmpanag.buonipastobool = dialogRes['buonipastobool'];
    tmpanag.distaccatopresso = dialogRes['distaccatopresso'];
    tmpanag.distaccatostarttime = dialogRes['distaccatostarttime'];
    tmpanag.distaccatofinishtime = dialogRes['distaccatofinishtime'];
    const tmpeco = new EconomicData();
    tmpeco.ral = dialogRes['ral'];
    tmpeco.pagamensile = dialogRes['pagamensile'];
    tmpeco.rimborsomensile = dialogRes['rimborsostimato'];
    tmpeco.diaria = dialogRes['diaria'];
    tmpeco.acivalue = dialogRes['acivalue'];

    return { usertoadd: tmpuser, anagtoadd: tmpanag, economictoadd: tmpeco };
  }

  openDialog() {
    const dialogRef = this.dialog.open(UserAdminCreationComponent, {
      width: '800px',
      height: '900px',
      autoFocus: false,
      panelClass: ['custom-dialog-container-creation'],
    });
    dialogRef.afterClosed().subscribe(
      res => {
        //console.log(" 1 res: ", res.data);
        if (res) {
          const val = res.data
          let myObj = this.parseDialogFormRes(res['data']);
          this.anagraphicService.addEconomicData(myObj.economictoadd).subscribe(res => {
            //console.log('2 economicData:', res);
            if (res['status'] === 'error') {
              this.toastrService.error("Errore nella creazione dell'utente");
              console.log(res['message']);
              return;
            }
            myObj.anagtoadd.economicdataid = res['data'].id;
            this.anagraphicService.addAnagraphicForUser(myObj.anagtoadd).subscribe(
              next => {
                //console.log('3 anag next:'  , next);
                if (next['status'] === 'error') {
                  this.toastrService.error("Errore nella creazione dell'utente");
                  console.log(res['message']);
                  return;
                } else {
                  myObj.usertoadd.anagraphicid = next['data'].id;
                  //console.log("myObj.usertoadd" , myObj.usertoadd);
                  //myObj.usertoadd.role = val.isadmin;
                  this.userAdminService.createNewUser(myObj.usertoadd).subscribe(
                    result => {
                      if (result['status'] === 'error') {
                        //gestione errore
                        if(result['message'].includes(this.errorRegnuminps)){
                          this.toastrService.error("Errore nella creazione dell'utente, questo Regnuminps è presente in un altro utente");
                        }else{
                          this.toastrService.error("Errore nella creazione dell'utente");
                        }
                        return;
                      } else {
                        let user = result['data'];
                        //console.log('user ', user)
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
                        newUser.name = next['data'].name;
                        newUser.surname = next['data'].surname;
                        newUser.phonenumber1 = next['data'].phonenumber1;
                        newUser.phonenumber2 = next['data'].phonenumber2;
                        this.users = [...this.users, newUser];
                        //console.log("user: ", user);
                        //console.log( "users: " ,this.users)
                      }
                    });
                }
              },
              error => {
                this.toastrService.error('Errore http');
              }
            );
          })

        }
      }
    );
  }

  getUserList() {
    const viewDate = new Date();
    const month = viewDate.getMonth();
    const year = viewDate.getFullYear();
    const loggeduser = this.authenticationService.currentUserValue;
    this.userAdminService.getListForUserList(month, year, loggeduser.role).subscribe(
      res => {
        if (res.status === "done") {
          this.users = res.data;
        }
      }
    );
  }

  getUserListLoadData(data : any){
    const month = this.mapMonth.get(data.month);
    const year = data.year;
    //aggiorno la data globale del timesheet
    this.globalTimesheetDate.month =  Number(month);
    this.globalTimesheetDate.year = Number(year);
    const loggeduser = this.authenticationService.currentUserValue;
    this.userAdminService.getListForUserList(month, year, loggeduser.role).subscribe(
      res => {
        if (res.status === "done") {
          this.users = res.data;
        }
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
    //console.log(user);
    this.selected = user;
    this.userAdminService.getUserInfoById(user.id).subscribe(res => {/*console.log(res)*/});
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
    //console.log(this.users);
  }
  clear() {
    //this.router.navigateByUrl('/user-admin');
    this.selected = null;
  }

  //aggiorno la table con i dati aggiornati
  clearUpdTable(evento){
    //log
    //console.log("evento :" ,evento)
    //log("evento selected before:" ,this.selected)

    //cambio i dati anagrafici della tabella a seconda di cosa arriva
    if(evento != null){

      if(evento.name != null){
        this.selected.name = evento.name
      }

      if (evento.surname != null) {
        this.selected.surname = evento.surname
      }

      if (evento.email != null){
        this.selected.email = evento.email
      }

      if (evento.username != null) {
        this.selected.username = evento.username
      }

      if (evento.phonenumber1 != null) {
        this.selected.phonenumber1 = evento.phonenumber1
      }

      if (evento.phonenumber2 != null) {
        this.selected.phonenumber2 = evento.phonenumber2
      }

      if (evento.role != null) {
        this.selected.role = evento.role
      }
    }
    //log
    //console.log("evento selected after:" ,this.selected)
    this.selected = null;

  }
  closeModal() {
    this.showModal = false;
  }
  //flag showbutton
  changeShowButton(flag) {
    this.showButton = flag;
  }


  deleteUserAdmin() {
    this.closeModal();
    if (this.userToDelete) {
      console.log(this.userToDelete);
      this.userAdminService.deleteNewUser(this.userToDelete.id)
            .subscribe(
              res => {
                this.users = this.users.filter(obj => obj !== this.userToDelete);
                this.userToDelete = null;
                this.toastrService.success(' Utente cancellato ');

              },
              error => {
                //console.log(error);
                this.toastrService.error('Errore nella cancellazione');
              });

      /*this.anagraphicService.deleteAnagraphic(this.userToDelete.anagraphicid).subscribe(
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
      );*/

    }
    this.clear();

  } 

  /*
   * genero la data di oggi che decidera quali dati vedro sulla lista utenti(Distaccato e stato del timesheet+-),quale mese in excel esportero e in che mese attererò all'Edit
   */
  generateDate(){
    //prendo la data dal local storage
    let currentData = this.savedataLocalStorageService.getValueLocalStorage("currentData")
    
    //genera la data di oggi
    let data : Date = new Date();
    if(currentData != null && currentData != undefined){
      data.setFullYear(currentData.year , this.mapMonth.get(currentData.month) , 1);
      let today : Date = new Date();
      if(data > today){
        data = new Date();
        this.savedataLocalStorageService.cleanValueStorage("currentData")
      }
    }
    this.globalTimesheetDate.year = data.getFullYear();
    this.globalTimesheetDate.month = data.getMonth();
  }
}
