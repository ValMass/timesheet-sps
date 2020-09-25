import { Component, OnInit, Input, EventEmitter, Output, AfterViewInit } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';
import { AnagraphicService } from '../services/anagraphic.service';
import { ContractService } from '../services/contract.service';
import { UserAdmin } from '../models/User-admin';
import { Anagraphic } from '../models/Anagraphic';
import { UserAdminService } from '../services/user-admin.service';
import { ToastrService } from 'ngx-toastr';
import { CustomersService } from '../services/customers.service';
import { OfficesService } from '../services/offices.service';
import { ActivityService } from '../services/activity.service';
import { AddActivityComponent } from '../add-activity/add-activity.component';
import { MatDialog } from '@angular/material/dialog';
import { UserAnagInfo } from '../models/UserAnagInfo';

@Component({
  selector: 'app-user-admin-detail',
  templateUrl: './user-admin-detail.component.html',
  styleUrls: ['./user-admin-detail.component.css'],
})

export class UserAdminDetailComponent implements OnInit, AfterViewInit {
  @Input() userAdmin: UserAdmin;
  @Output() unselect = new EventEmitter<string>();
  @Output() save = new EventEmitter<UserAdmin>();

  contractList: any[]; // Contract[]
  officesList: any[]; // Offices[]
  customersList: any[]; // Customer[]
  activityList: any[]; // activities

  userForm: FormGroup;
  anagForm: FormGroup;
  contractForm: FormGroup;
  activityForm: FormGroup;

  constructor(
    private anagService: AnagraphicService,
    private contractService: ContractService,
    private userAdminService: UserAdminService,
    private toastrService: ToastrService,
    private customerService: CustomersService,
    private officesService: OfficesService,
    private activityService: ActivityService,
    public dialog: MatDialog,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.userForm = this.createUserForm();
    this.anagForm = this.createAnagForm();
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
    this.userForm.patchValue(userInfo['data'][0].uset);
    this.anagForm.patchValue(userInfo['data'][0].anag);
    this.contractForm.patchValue({contractid: userInfo['data'][0].anag.contractid});
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
    this.anagService.updateAnagraphicForUser({id: this.userAdmin.id, ...this.anagForm.value})
      .subscribe(res => {
        if (res['status'] === 'done') {
          this.toastrService.success('Anagrafica utente aggiornata');
        } else {
          this.toastrService.error('Errore nell\'aggiornamento dell\'anagrafica utente');
        }
      });
  }

  submitContract() {
    // passare tutta anagrafica.
    console.log('stai provando ad aggiungere il contratto: ', this.contractForm.value);
  }

  deleteActivity(activity) {
    console.log('stai provando a cancellare: ', activity);
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
    });
    return anagForm;
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

  clear() {
    this.unselect.emit();
  }

  openAddActivityDialog() {
    const dialogRef = this.dialog.open(AddActivityComponent, {
      width: '600px',
      data: {
        userid: this.userAdmin.id,
        customerList: this.customersList,
      }
    });
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
}
