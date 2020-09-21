import { AnagraphicData } from './../../../models/anagraphicdatamodel';
import { DateAdapter } from 'angular-calendar';
import { Component, OnInit, ChangeDetectionStrategy, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { AnagraphicService } from '../services/anagraphic.service';
import { ContractService } from '../services/contract.service';
import { UserAdmin } from '../models/User-admin';
import { Contract } from '../models/Contract';
import { Anagraphic } from '../models/Anagraphic';
import { Observable } from 'rxjs';
import { UserAdminService } from '../services/user-admin.service';
import { ToastrService } from 'ngx-toastr';
import { CustomersService } from '../services/customers.service';
import { OfficesService } from '../services/offices.service';
import { ActivityService } from '../services/activity.service';
import { AddActivityComponent } from '../add-activity/add-activity.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-user-admin-detail',
  templateUrl: './user-admin-detail.component.html',
  styleUrls: ['./user-admin-detail.component.css'],
})

export class UserAdminDetailComponent implements OnInit {
  @Input() userAdmin: UserAdmin;
  @Output() unselect = new EventEmitter<string>();
  @Output() save = new EventEmitter<UserAdmin>();

  addMode = false;
  editingUser: UserAdmin = new UserAdmin();
  editingAnag: Anagraphic;
  selectedContract: any;

  contractList: any[]; // Contract[]
  officesList: any[]; // Offices[]
  customersList: any[]; // Customer[]
  activityList: any[]; //activities


  userForm = new FormGroup({
    username: new FormControl('', [Validators.required,]),
    password: new FormControl('', [Validators.required,]),
    numeroinps: new FormControl('', [Validators.required,]),
    numerosps: new FormControl('', [Validators.required,]),
    email: new FormControl('', [Validators.required,]),
    isadmin: new FormControl('', [Validators.required,]),
  });

  anagForm = new FormGroup({
    name: new FormControl('', [Validators.required,]),
    surname: new FormControl('', [Validators.required,]),
    birthdate: new FormControl('', [Validators.required,]),
    birthplace: new FormControl('', [Validators.required,]),
    sededilavoro: new FormControl('', [Validators.required,]),
  });
  // id, address, regnuminps,  contracttype, distaccatoda, distaccatoa, sededilavoro, valorerimborsistimato, buonipastobool, sex, contractid

  contractForm = new FormGroup({
    contracttype: new FormControl('', [Validators.required,]),
    startingfrom: new FormControl('', [Validators.required,]),
    birthplace: new FormControl('', [Validators.required,]),
  });

  activityForm = new FormGroup({
    id: new FormControl('', [Validators.required,]),
    name: new FormControl('', [Validators.required,]),
  });

  constructor(
    private anagService: AnagraphicService,
    private contractService: ContractService,
    private userAdminService: UserAdminService,
    private toastrService: ToastrService,
    private customerService: CustomersService,
    private officesService: OfficesService,
    private activityService: ActivityService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    console.log(this.userAdmin);
    const contact = {
      username: this.userAdmin.username,
      password: this.userAdmin.password,
      numeroinps: this.userAdmin.regnuminps,
      numerosps: this.userAdmin.regnumsps,
      email: this.userAdmin.email,
      isadmin: this.userAdmin.role,
    };

    this.activityService.listActivities(this.userAdmin.id).subscribe(
      result => {
        console.log(result);
        if ( result.status === 'done') {
          this.activityList = result.data;
        } else {
          this.toastrService.error('Errore nella lista delle attività : ' + result.message);
        }
      },
      error => {
        console.log("activityservice error");
      },
    );

    this.customerService.listAllCustomer().subscribe(
      result => {
        console.log(result);
        if ( result.status === 'done') {
          this.customersList = result.data;
        } else {
          this.toastrService.error('Errore nella lista dei clienti : ' + result.message);
        }
      },
      error => {
        console.log("customerservice error");

      }
    );

    this.officesService.listAllOffices().subscribe(
      result => {
        console.log(result.data);
        this.officesList = result.data ;
      },
      error => {
        console.log(error);
      }

    );

    this.selectedContract = {};
    this.contractService.listAllContract(contact).subscribe(
      data => {

        const tmp = this.createListForcontract(data.data);
        this.contractList = tmp;
        console.log(this.contractList);
      }
    );
    this.userForm.setValue(contact);
    this.anagService.getAnagraphic(this.userAdmin.anagraphicid).subscribe(
      data => {
        console.log(data["data"]);
        const actData = data["data"];
        this.anagForm.patchValue(actData);
        this.editingAnag = actData;
        if (actData.contractid != null) {
          this.contractService.getContract(actData.contractid).subscribe(
            res => {
              console.log(res["data"]);
              this.selectedContract = res["data"];
              this.selectedContract.tolist = this.selectedContract.title + ' '
                + this.selectedContract.contracttype + ' ' + this.selectedContract.level + ' livello ' + this.selectedContract.ccnl;
              console.log(this.selectedContract);
            },
            error => { }
          );
        }


      },
      err => {
        console.log(err);

      });
  }


  createListForcontract(contracts) {
    for (const contr of contracts) {
      contr.tolist = contr.title + ' ' + contr.contracttype + ' ' + contr.level + ' livello ' + contr.ccnl;
    }
    return contracts;
  }

  clear() {
    this.unselect.emit();
  }

  submitUser() {
    let newUser = new UserAdmin();
    newUser.id = this.userAdmin.id;
    newUser.username = this.userForm.get('username').value;
    newUser.password = this.userForm.get('password').value;
    newUser.regnuminps = this.userForm.get('numeroinps').value;
    newUser.regnumsps = this.userForm.get('numerosps').value;
    newUser.email = this.userForm.get('email').value;
    newUser.role = this.userForm.get('isadmin').value;

    this.userAdminService.updateUser(newUser).subscribe(
      result => {
        console.log(result);
        if (result['status'] === 'done') {
          this.userAdmin.username = result['data'].username;
          this.userAdmin.password = result['data'].password;
          this.userAdmin.regnuminps = result['data'].regnuminps;
          this.userAdmin.regnumsps = result['data'].regnumsps;
          this.userAdmin.email = result['data'].email;
          this.userAdmin.role = result['data'].role;
          this.userForm.patchValue(this.userAdmin);
          this.toastrService.success('Utente aggiornato');
        } else {
          this.toastrService.error('Errore: utente non salvato');
          this.clearUser();
        }
      },
      error => {
        console.log(error);
        this.toastrService.error('Errore utente non salvato : ' + error);
        this.clearUser();
      }
    );
  }

  clearUser() {
    console.log(this.editingUser);
    const contact = {
      username: this.userAdmin.username,
      password: this.userAdmin.password,
      numeroinps: this.userAdmin.regnuminps,
      numerosps: this.userAdmin.regnumsps,
      email: this.userAdmin.email,
      isadmin: this.userAdmin.role,
    };
    this.userForm.setValue(contact);
  }


  submitAnag() { }
  submitContract() {
    console.log(this.selectedContract);
    this.editingAnag.contractid = this.selectedContract.id;
    this.anagService.updateAnagraphicForUser(this.editingAnag).subscribe(
      data => {
        console.log(data);
      },
      error => {

      }
    );

  }

  submitActivity() {

  }
  saveAll() {

  }

  deleteActivity($event) {

  }

  openAddActivityDialog() {
    const dialogRef = this.dialog.open( AddActivityComponent, {
      width: '600px',
      height: '300px',
      data: {
              userid: this.userAdmin.id,
              customerList: this.customersList,
            }
    });
    dialogRef.afterClosed().subscribe(
      res => {
        console.log(res.data);
        console.log(this.userAdmin.id);


        this.activityService.createActivity(res.data.activityName, this.userAdmin.id , res.data.customerId).subscribe(
          result => {
            if ( result.status === "done"){
              console.log(result.data);

            } else {
              this.toastrService.error("Errore nel salvare l'attività: " + result.message );
            }
          },
          error =>{

          }
        );
      },
      );
  }
}
