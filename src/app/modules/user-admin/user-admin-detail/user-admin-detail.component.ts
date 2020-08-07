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

@Component({
  selector: 'app-user-admin-detail',
  templateUrl: './user-admin-detail.component.html',
  styleUrls: ['./user-admin-detail.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
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


  userForm = new FormGroup({
    username: new FormControl('', [Validators.required, ]),
    password: new FormControl('', [Validators.required, ]),
    numeroinps: new FormControl('', [Validators.required, ]),
    numerosps: new FormControl('', [Validators.required, ]),
    email: new FormControl('', [Validators.required, ]),
  });

  anagForm = new FormGroup({
    name: new FormControl('', [Validators.required, ]),
    surname: new FormControl('', [Validators.required, ]),
    birthdate: new FormControl('', [Validators.required, ]),
    birthplace: new FormControl('', [Validators.required, ]),

  });
  // id, address, regnuminps,  contracttype, distaccatoda, distaccatoa, sededilavoro, valorerimborsistimato, buonipastobool, sex, contractid

  contractForm = new FormGroup({
    contracttype: new FormControl('', [Validators.required, ]),
    startingfrom: new FormControl('', [Validators.required, ]),
    birthplace: new FormControl('', [Validators.required, ]),
  });

  constructor(
    private anagService: AnagraphicService,
    private contractService: ContractService,
    private userAdminService: UserAdminService,
  ) { }

  ngOnInit(): void {
    const contact = {
      username: this.userAdmin.username,
      password: this.userAdmin.password,
      numeroinps: this.userAdmin.regnuminps,
      numerosps: this.userAdmin.regnumsps,
      email: this.userAdmin.email,
      };
    this.selectedContract = {};
    this.contractService.listAllContract(contact).subscribe(
      data => {
        const tmp = this.createListForcontract(data.data);
        this.contractList = tmp;
        console.log(this.contractList);
      }
    );
    this.userForm.setValue(contact);
    this.anagService.getAnagraphic(this.userAdmin.id).subscribe(
      data => {
      console.log(data["data"]);
      const actData = data["data"];
      this.anagForm.patchValue(actData);
      this.editingAnag = actData;
      if ( actData.contractid != null ) {
        this.contractService.getContract(actData.contractid).subscribe(
          res => {
            console.log(res["data"]);
            this.selectedContract = res["data"];
            this.selectedContract.tolist = this.selectedContract.title + ' '
             + this.selectedContract.contracttype + ' ' + this.selectedContract.level + ' livello ' + this.selectedContract.ccnl;
            console.log(this.selectedContract);
          },
          error => {}
        );
      }


      },
      err => {
        console.log(err);

      });

  }
  createListForcontract( contracts ) {
    for (const contr of contracts) {
      contr.tolist = contr.title + ' ' + contr.contracttype + ' ' + contr.level + ' livello ' + contr.ccnl;
    }
    return contracts;
  }

  clear() {
    this.unselect.emit();
  }

  saveCustomer() {
    this.save.emit(this.editingUser);
    this.clear();
  }
  submitUser() {
    let newUser = new UserAdmin();
    newUser.username = this.userForm.get('username').value;
    newUser.password = this.userForm.get('password').value;
    newUser.regnuminps = this.userForm.get('numeroinps').value;
    newUser.regnumsps = this.userForm.get('numerosps').value;
    newUser.email = this.userForm.get('email').value;

    this.userAdminService.updateUser( newUser ).subscribe(
      data => {
        console.log(data);
      },
      error => {
        console.log(error);
      }
    );


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
   saveAll() {

   }
}
