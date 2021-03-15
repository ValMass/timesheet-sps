import { RegnumSpsService } from './../services/regnum-sps.service';
import { NewGenaratePasswordService } from './../services/new-genarate-password.service';
import { AddInternalactivityComponent } from './../add-internalactivity/add-internalactivity.component';
import { InternalactivityService } from './../services/internalactivity.service';
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
import { NewPasswordComponent } from '@app/shared/new-password/new-password.component';

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
  internalActivitiesList: any[];
  internalActivitiesAssigned: any[]; // activities
  
  userForm: FormGroup;
  anagForm: FormGroup;
  econForm: FormGroup;
  contractForm: FormGroup;
  activityForm: FormGroup;

  anagFormValue: any
  userFormValue: any
  activitiesType : any;

  //flag boolean
  anagFlag: boolean = false;
  userFlag: boolean = false;

  //password
  //psw: string = "password";
  password: string = '';
  userId : string;

  //ruolo dell utente o admin da modificare
  roleEdited : string = '';

  //variabili che contengono  pattern che devono essere rispettati
  patternEmail = new RegExp("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$");
  patternCifra = new RegExp("[0-9 ]+$");
  patternDecimale = new RegExp("[0-9]+([,.][0-9]+)?$");

  //questa variabile memorizza il valore di default RegnumSps
  //quando l'utente modifichera questo campo sara portato al padre
  //che si occupera di aggiornare la lista con tutti i RegnumSps
  //da escludere nella scelta durante la creazione dell'utente
  defaultRegnumSps : number = 0;
  listRegnumSps : any = [];
  listRegnumSpsAdmins : any;
  listRegnumSpsUsers : any;

  //submited Boolean
  submittedUser : boolean = false;
  submittedAnag : boolean = false;
  submittedEconomic : boolean = false;
  enablerimborsoextra : boolean = false;

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
    private internalActivityService : InternalactivityService,
    private newGenaratePasswordService : NewGenaratePasswordService,
    private regnumSpsService: RegnumSpsService
  ) { }

  ngOnInit(): void {
    this.userForm = this.createUserForm();
    this.anagForm = this.createAnagForm();
    this.econForm = this.createEconomicForm();
    this.contractForm = this.createContractForm();
    this.activityForm = this.createActivityForm();

    this.getInternalActivities();
    this.getActivityList();
    this.getInternalActivitiesAssigned();
    this.getAllActivityType();
    this.getListRegnumSps();
    
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
        this.officesList = result.data;
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
          this.toastrService.warning("Nessuna attività esterna associata all\'utente");
        }
      });
  }

  getAllActivityType(){
    this.activityService.getAllActivityType().subscribe(res =>{
      this.activitiesType = res["data"];
      console.log("activitiesType" , this.activitiesType);
    })
  }

  async ngAfterViewInit() {
    const userInfo = await this.userAdminService.getUserInfoById(this.userAdmin.id).toPromise();
    const anagInfo = await this.anagService.getAnagraphic(this.userAdmin.id).toPromise();
    console.log("anagInfo", anagInfo);
    if (anagInfo['data'].buonipastobool != 0) {
      anagInfo['data'].buonipastobool = true;
    } else {
      anagInfo['data'].buonipastobool = false;
    }
    const economicInfo = await this.economicService.getEconomic(anagInfo['data']['economicdataid']).toPromise();
    console.log("economicInfo", economicInfo);
    
    //arrotondo alla seconda cifra decimale avanzo rimborso 
    economicInfo['data'].avanzorimborso = parseFloat(economicInfo['data'].avanzorimborso).toFixed(2)

    //flag che controlla se l'utente ha abilitato il rimborso extra in precedenza
    this.enablerimborsoextra = economicInfo['data'].extrarimborsobool === "0" ? false : true;

    this.userForm.patchValue(userInfo['data'][0].uset);
    this.password = userInfo['data'][0].uset.password;
    this.userId = userInfo['data'][0].uset.id;
    this.roleEdited = userInfo['data'][0].uset.role;
    this.defaultRegnumSps = Number(userInfo['data'][0].uset.regnumsps);
    
    if((this.activityList.length === 0) && (this.roleEdited === '2')){
      this.toastrService.warning("Nessuna attività esterna associata all\'utente");
    }
    if((this.internalActivitiesAssigned.length === 0) && (this.roleEdited === '2')){
      this.toastrService.warning("Nessuna attività interna associata all\'utente");
    }

    if(this.roleEdited == "2"){
      this.listRegnumSps = this.listRegnumSpsUsers;
    }else{
      this.listRegnumSps = this.listRegnumSpsAdmins;
    }

    this.anagForm.patchValue(anagInfo['data']);
    this.econForm.patchValue(economicInfo['data']);
    this.contractForm.patchValue({ contractid: anagInfo['data'].contractid });
  }

  createListForcontract(contracts) {
    for (const contr of contracts) {
      contr.id = contr.id;
      contr.value = contr.title + ' ' + contr.contracttype + ' ' + contr.level + ' livello ' + contr.ccnl;
    }
    return contracts;
  }

  submitUser() {
    this.submittedUser = true
    console.log("userform :", this.userForm.value)
    
    /*if ((this.patternEmail.test(this.userForm.value.email)) &&
      //(this.userForm.value.password.length >= 6) &&
      (this.patternCifra.test(this.userForm.value.regnuminps)) &&
      (this.patternCifra.test(this.userForm.value.regnumsps)) &&
      (this.userForm.value.role != null) &&
      (this.userForm.value.username.length >= 4)) {
      this.userAdminService.updateUser({ id: this.userAdmin.id, ...this.userForm.value })
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
    } else {
      this.toastrService.error('Inserire i dati obbligatori');
    }*/

  }

  submitAnag() {
    this.submittedAnag = true

    if (this.anagForm.value.buonipastobool != false) {
      this.anagForm.value.buonipastobool = 1;
    } else {
      this.anagForm.value.buonipastobool = 0;
    }

    if(this.patternCifra.test(this.anagForm.value.phonenumber2) || this.anagForm.value.phonenumber2 === null  || this.anagForm.value.phonenumber2 === ""){
      if ((this.anagForm.value.address.length >= 2) &&
      (this.anagForm.value.birthplace.length >= 2) &&
      (this.anagForm.value.name.length >= 2) &&
      (this.patternCifra.test(this.anagForm.value.phonenumber1)) &&
      (this.anagForm.value.surname.length >= 2) /*&&
      (this.anagForm.value.sededilavoro != null)*/) {

      console.log("this.anagForm.value", this.anagForm.value)
      this.anagService.updateAnagraphicForUser({ id: this.userAdmin.id, ...this.anagForm.value })
        .subscribe(res => {
          //console.log("Anagrafica", res)
          if (res['status'] === 'done') {
            this.toastrService.success('Anagrafica utente aggiornata');

            //aggiorno il flag
            this.anagFlag = true;
            this.anagFormValue = this.anagForm.value

          } else {
            this.toastrService.error('Errore nell\'aggiornamento dell\'anagrafica utente');
          }
        });
      } else {
        this.toastrService.error('Inserire i dati obbligatori');
      }
  
    }
     else {
      this.toastrService.error('Inserire i dati obbligatori');
    }


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
    this.submittedEconomic = true;
    
    if ((this.patternDecimale.test(this.econForm.value.acivalue)) &&
      (this.patternDecimale.test(this.econForm.value.pagamensile)) &&
      (this.patternCifra.test(this.econForm.value.ral)) &&
      (this.patternCifra.test(this.econForm.value.rimborsomensile)) &&
      (this.patternCifra.test(this.econForm.value.diaria))) {
      
      this.econForm.value.acivalue = this.commaToDot(this.econForm.value.acivalue);
      this.econForm.value.pagamensile = this.commaToDot(this.econForm.value.pagamensile);

      this.economicService.updateEconomicData(this.econForm.value).subscribe(
        res => {
          if (res['status'] === 'done') {
            this.toastrService.success('Dati economici aggiornati');
          } else {
            this.toastrService.error('Errore nell\'aggiornamento dei dati economici');
          }
        },
        error => {
          this.toastrService.error('Errore http: ' + error);
        }
      );
    } else {
      this.toastrService.error('Inserire i dati obbligatori');
    }

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
      //password: ['', [Validators.required]],
      regnuminps: ['', [Validators.required]],
      regnumsps:  [this.defaultRegnumSps, [Validators.required]],
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
      address: ['', [Validators.required]],
      distaccatofinishtime: ['', [Validators.required]],
      distaccatopresso: ['', [Validators.required]],
      distaccatostarttime: ['', [Validators.required]],
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
      extrarimborsobool: ['', [Validators.required]],
      extrarimborso: [0, [Validators.required]],
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
      id: ['', [Validators.required,]],
      name: ['', [Validators.required,]],
    });
    return activityForm;
  }

  //clear e updata data se sono stati cambiati
  clear() {

    //log
    //console.log("anagForm:", this.anagFormValue);
    //console.log("userForm:", this.userFormValue);

    //a seconda dei casi viene emesso un dato diverso
    switch (true) {

      case (this.userFlag && this.anagFlag):
        //log
        //console.log("case1: ", "this.userFlag : ", this.userFlag, "this.anagFlag : ", this.anagFlag);
        //unisco
        const merged = Object.assign(this.anagFormValue, this.userFormValue);

        //emetto
        this.unselect.emit(merged);

        break;
      case (this.userFlag && !this.anagFlag):
        //log
        //console.log("case2: ", "this.userFlag : ", this.userFlag, "this.anagFlag : ", this.anagFlag);
        //emetto
        this.unselect.emit(this.userFormValue);

        break;

      case (!this.userFlag && this.anagFlag):
        //log
        //console.log("case3: ", "this.userFlag : ", this.userFlag, "this.anagFlag : ", this.anagFlag);

        //emetto
        this.unselect.emit(this.anagFormValue);

        break;
      case (!this.userFlag && !this.anagFlag):
        //log
        //console.log("case4: ", "this.userFlag : ", this.userFlag, "this.anagFlag : ", this.anagFlag);

        //emetto
        this.unselect.emit(null);

        break;
    }
    //console.log("exit")

    //showButton
    this.showButton.emit(true);



  }

  updatePassword(){
    const dialogRef = this.dialog.open(NewPasswordComponent, {
      width: '600px',
      data:
      {
        userid: this.userId,
        isUser: false,
      }
    })
    dialogRef.afterClosed().subscribe(password =>{
      if(password && password != 'close'){
        this.newGenaratePasswordService.changePassword(password["data"].userId , password["data"].newPassword)
          .subscribe( res =>{
            if(res){
              this.password = res['data'];
              this.toastrService.success('Password salvata con successo');
            }else{
              this.toastrService.error('Errore nel salvare la password');
            }
          });
      }else{
        this.toastrService.warning('nessuna modifica effettuata');
      }
    })
  }

  openAddActivityDialog() {
    const dialogRef = this.dialog.open(AddActivityComponent, {
      width: '600px',
      panelClass: ['custom-dialog-container'],
      data: {
        userid: this.userAdmin.id,
        customerList: this.customersList,
        activitiesType : this.activitiesType,
      }
    });
    dialogRef.addPanelClass(['custom-dialog-container']);
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.activityService.createActivity(res.data.activityName, this.userAdmin.id, res.data.customerId , res.data.defaultactivitytype , res.defaulttype)
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

  getInternalActivities(){
    this.internalActivityService.getInternalActivitiesList("1").subscribe(
      res => this.internalActivitiesList = res["data"] 
    );
  }

  getInternalActivitiesAssigned(){
    this.internalActivityService.getInternalActivities(this.userAdmin.id)
      .subscribe(result => {
        if (result.status === 'done') {
          //console.log("result.data" , result.data)
          this.internalActivitiesAssigned = result.data;
        } else {
          this.toastrService.warning("Nessuna attività interna associata all\'utente");
        }
      });
  }

  assignInternalActivity(){
    const dialogRef = this.dialog.open(AddInternalactivityComponent, {
      width: '600px',
      panelClass: ['custom-dialog-container'],
      data: {
        userid: this.userAdmin.id,
        internalActivitiesList: this.internalActivitiesList,
      }
    });
    dialogRef.addPanelClass(['custom-dialog-container']);
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        //console.log("resAssignInternalActivity" , res["data"].internalAct);
        let internalActToadd =  res["data"].internalAct;
        let ruoloToadd = res["data"].ruolo;
        this.internalActivityService.assignInternalActivity(internalActToadd.inat.id , this.userAdmin.id , ruoloToadd)
          .subscribe(result => {
            if (result.status === 'done') {
              this.toastrService.success('Attività aggiunta correttamente');
              this.getInternalActivitiesAssigned();
            } else {
              this.toastrService.error('Errore nel salvare l\'attività: ' + result.message);
            }
          });
      }
    });
  }

  removeInternalActivity(internalActivity){
    if (confirm(`Sei sicuro di voler eliminare l'attività: ${internalActivity.inat.name}?`)) {
      console.log( "internalActivity", internalActivity)
      this.internalActivityService.removeInternalActivity(internalActivity.rela.internalactivitiesid , internalActivity.rela.userid ).subscribe( res =>{
        if (res['status'] === 'done') {
          this.toastrService.success('Attività eliminata correttamente');
          this.getInternalActivitiesAssigned();
        }else{
          this.toastrService.error('Errore nell\'eliminazione dell\'attività');
        }
      })
    }
  }

  //mostro o nascondo la password a seconda dei casi
  /*pswHideShow() {
    if (this.psw === "password") {
      this.psw = "text";
    } else {
      this.psw = "password";
    }
  }*/

  commaToDot(value) {
    let commaDotvalue: string = value.replace(/,/g, '.')
    return (commaDotvalue);
  }

  tipoAttivita(tipo){
    let res : String = '';
    let descrizioneAttivita  = this.activitiesType.find(act => act.id === tipo.act.type);
    res = descrizioneAttivita.descrizione
    if(tipo.act.defaulttype === "1" && tipo.act.type === tipo.cus.defaultactivitytype){
      res = res + " (Default)" 
    }
    return(res);
  }

  cleanDistaccoStartTime(){
    this.anagForm.patchValue({distaccatostarttime: ''});
  }

  cleanDistaccoEndTime(){
    this.anagForm.patchValue({distaccatofinishtime: ''});
  }

  editrimborsoextra(){
    
    this.enablerimborsoextra = !this.enablerimborsoextra;
    this.econForm.patchValue({extrarimborso : "0" , extrarimborsobool : this.enablerimborsoextra === false ? 0 : 1})
  }

  
  getListRegnumSps(){
    this.regnumSpsService.getListAllRegnumSps().subscribe(res =>{
      this.listRegnumSpsAdmins = [...res["data"]["admin"]];
      this.listRegnumSpsUsers = [...res["data"]["normal"]];
    })
  }
}
