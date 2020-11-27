import { Component, OnInit, Input, EventEmitter, Output, AfterViewInit } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';
import { AnagraphicService } from '../services/anagraphic.service';
import { ContractService } from '../services/contract.service';
import { UserAdmin } from '../models/User-admin';
import { UserAdminService } from '../services/user-admin.service';
import { ToastrService } from 'ngx-toastr';
import { CustomersService } from '../services/customers.service';
import { OfficesService } from '../services/offices.service';
import { ActivityService } from '../services/activity.service';
import { AddActivityComponent } from '../add-activity/add-activity.component';
import { MatDialog } from '@angular/material/dialog';
import { EconomicService } from '../services/economic.service';

@Component({
  selector: 'app-user-admin-detail',
  templateUrl: './user-admin-detail.component.html',
  styleUrls: ['./user-admin-detail.component.css'],
})

export class UserAdminDetailComponent implements OnInit, AfterViewInit {
  @Input() userAdmin: UserAdmin;
  @Output() unselect = new EventEmitter<any>();
  @Output() save = new EventEmitter<UserAdmin>();

  //flag showButton
  @Output() showButton = new EventEmitter<Boolean>();

  contractList: any[]; // Contract[]
  officesList: any[]; // Offices[]
  customersList: any[]; // Customer[]
  activityList: any[]; // activities

  userForm: FormGroup;
  anagForm: FormGroup;
  econForm: FormGroup;
  contractForm: FormGroup;
  activityForm: FormGroup;

  anagFormValue : any
  userFormValue : any

  //flag boolean
  anagFlag : boolean = false;
  userFlag : boolean = false;

  //password
  psw : string = "password";

  constructor(
    private anagService: AnagraphicService,
    private contractService: ContractService,
    private userAdminService: UserAdminService,
    private toastrService: ToastrService,
    private customerService: CustomersService,
    private officesService: OfficesService,
    private activityService: ActivityService,
    private economicService: EconomicService,
    public dialog: MatDialog,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.userForm = this.createUserForm();
    this.anagForm = this.createAnagForm();
    this.econForm = this.createEconomicForm();
    this.contractForm = this.createContractForm();
    this.activityForm = this.createActivityForm();

    this.getActivityList();

    this.customerService.listAllCustomer()
      .subscribe(result => {
        if (result.status === 'done') {
          this.customersList = result.data;
        } else {
          this.toastrService.error('Errore nella lista dei clienti : ' + result.message);
        }
      });

    this.officesService.listAllOffices()
      .subscribe(result => {
        this.officesList = result.data ;
      }, error => {
        console.log(error);
      });

    this.contractService.listAllContract()
      .subscribe(data => {
        this.contractList = this.createListForcontract(data.data);
      });
  }

  getActivityList() {
    this.activityService.listActivities(this.userAdmin.id)
      .subscribe(result => {
        if (result.status === 'done') {
          this.activityList = result.data;
        } else {
          this.toastrService.error('Errore nella lista delle attività : ' + result.message);
        }
      });
  }

  async ngAfterViewInit() {
    const userInfo = await this.userAdminService.getUserInfoById(this.userAdmin.id).toPromise();
    const anagInfo = await this.anagService.getAnagraphic(this.userAdmin.id).toPromise();
    console.log("anagInfo" , anagInfo);
    const economicInfo = await this.economicService.getEconomic(anagInfo['data']['economicdataid']).toPromise();
    console.log("economicInfo" , economicInfo);
    this.userForm.patchValue(userInfo['data'][0].uset);
    this.anagForm.patchValue(anagInfo['data']);
    this.econForm.patchValue(economicInfo['data']);
    this.contractForm.patchValue({contractid: anagInfo['data'].contractid});
  }

  createListForcontract(contracts) {
    for (const contr of contracts) {
      contr.id = contr.id;
      contr.value = contr.title + ' ' + contr.contracttype + ' ' + contr.level + ' livello ' + contr.ccnl;
    }
    return contracts;
  }

  submitUser() {
    this.userAdminService.updateUser({id: this.userAdmin.id, ...this.userForm.value})
      .subscribe(result => {
        if (result['status'] === 'done') {
          this.toastrService.success('Utente aggiornato');

          //aggiorno il flag
          this.userFlag = true;
          this.userFormValue = this.userForm.value

        } else {
          this.toastrService.error('Errore: utente non salvato');
        }
      },
      error => {
        this.toastrService.error('Errore utente non salvato : ' + error);
      }
    );
  }

  submitAnag() {
    console.log("this.anagForm.value" , this.anagForm.value)
    this.anagService.updateAnagraphicForUser({id: this.userAdmin.id, ...this.anagForm.value})
      .subscribe(res => { console.log("Anagrafica" , res)
        if (res['status'] === 'done') {
          this.toastrService.success('Anagrafica utente aggiornata');

          //aggiorno il flag
          this.anagFlag = true;
          this.anagFormValue = this.anagForm.value

        } else {
          this.toastrService.error('Errore nell\'aggiornamento dell\'anagrafica utente');
        }
      });
  }

  async submitContract() {
    const { contracttype, id } = this.contractList.filter(contract => contract.id === this.contractForm.value.contractid)[0];
    const anagrafica = await this.anagService.getAnagraphic(this.userAdmin.id).toPromise();
    const anagToUpdate = { ...anagrafica['data'], contracttype, contractid: id };
    this.anagService.updateAnagraphicForUser(anagToUpdate)
      .subscribe(res => {
        if (res['status'] === 'done') {
          this.toastrService.success('Contratto aggiornato correttamente');
        } else {
          this.toastrService.error('Errore nell\'aggiornamento del contratto');
        }
      });
  }

  submitEconomic() {
    console.log(this.econForm.value);
    this.economicService.updateEconomicData(this.econForm.value).subscribe(
      res =>{
        if (res['status'] === 'done') {
        this.toastrService.success('Economic data aggiornato correttamente');
      } else {
        this.toastrService.error('Errore nell\'aggiornamento del contratto');
      }
    },
    error => {
      this.toastrService.error('Errore http: ' + error);
    }
    );
  }

  deleteActivity(activity) {
    if (confirm(`Sei sicuro di voler eliminare l'attività: ${activity.act.name}?`)) {
      this.activityService.deleteActivityById(activity.act.id)
        .subscribe(res => {
          if (res['status'] === 'done') {
            this.toastrService.success('Attività eliminata correttamente');
            this.activityList = this.activityList.filter(activity => activity.act.id !== res['data'].id);
          } else {
            this.toastrService.error('Errore nell\'eliminazione dell\'attività');
          }
        });
    }
  }

  createUserForm() {
    const userForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      regNumInps: ['', [Validators.required]],
      regNumSps: ['', [Validators.required]],
      email: ['', [Validators.required]],
      role: ['', [Validators.required]],
    });
    return userForm;
  }

  createAnagForm() {
    const anagForm = this.fb.group({
      name: ['', [Validators.required]],
      surname: ['', [Validators.required]],
      birthdate: ['', [Validators.required]],
      birthplace: ['', [Validators.required]],
      sededilavoro: ['', [Validators.required]],
      buonipastobool: ['', [Validators.required]],
      phonenumber1: ['', [Validators.required]],
      phonenumber2: ['', [Validators.required]],
    });
    return anagForm;
  }
  createEconomicForm() {
    const economicForm = this.fb.group({
      id: [''],
      ral: ['', [Validators.required]],
      pagamensile: ['', [Validators.required]],
      rimborsomensile: ['', [Validators.required]],
      diaria: ['', [Validators.required]],
      acivalue: ['', [Validators.required]],
      avanzorimborso: ['', [Validators.required]],
    });
    return economicForm;
  }

  createContractForm() {
    const contractForm = this.fb.group({
      contractid: ['', [Validators.required]],
    });
    return contractForm;
  }

  createActivityForm() {
    const activityForm = this.fb.group({
      id: ['', [Validators.required, ]],
      name: ['', [Validators.required, ]],
    });
    return activityForm;
  }

  //clear e updata data se sono stati cambiati
  clear() {

    //log
    console.log("anagForm:" ,this.anagFormValue );
    console.log("userForm:" ,this.userFormValue );

    //a seconda dei casi viene emesso un dato diverso
    switch(true){

      case (this.userFlag  && this.anagFlag ):
        //log
        console.log("case1: " , "this.userFlag : ", this.userFlag , "this.anagFlag : ", this.anagFlag  );

        //unisco
        const  merged = Object.assign(this.anagFormValue, this.userFormValue);

        //emetto
        this.unselect.emit(merged);

        break;
      case (this.userFlag  && !this.anagFlag ):
        //log
        console.log("case2: " , "this.userFlag : ", this.userFlag , "this.anagFlag : ", this.anagFlag  );

        //emetto
        this.unselect.emit(this.userFormValue);

        break;

      case (!this.userFlag  && this.anagFlag ):
         //log
         console.log("case3: " , "this.userFlag : ", this.userFlag , "this.anagFlag : ", this.anagFlag  );

         //emetto
         this.unselect.emit(this.anagFormValue);

        break;
      case (!this.userFlag && !this.anagFlag ):
        //log
        console.log("case4: " , "this.userFlag : ", this.userFlag , "this.anagFlag : ", this.anagFlag  );

        //emetto
        this.unselect.emit(null);

        break;
    }
    console.log("exit")

    //showButton
    this.showButton.emit(true);



  }

  openAddActivityDialog() {
    const dialogRef = this.dialog.open(AddActivityComponent, {
      width: '600px',
      panelClass: ['custom-dialog-container'],
      data: {
        userid: this.userAdmin.id,
        customerList: this.customersList,
      }
    });
    dialogRef.addPanelClass(['custom-dialog-container']);
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.activityService.createActivity(res.data.activityName, this.userAdmin.id, res.data.customerId)
          .subscribe(result => {
            if (result.status === 'done') {
              this.toastrService.success('Attività aggiunta correttamente');
              this.getActivityList();
            } else {
              this.toastrService.error('Errore nel salvare l\'attività: ' + result.message);
            }
          });
      }
    });
  }

  //mostro o nascondo la password a seconda dei casi
  pswHideShow(){
    if (this.psw === "password"){
      this.psw = "text";
    }else{
      this.psw = "password";
    }
  }

}
