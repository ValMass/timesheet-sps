import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserAnagService } from './service/user-anag.service';
import { ContractAnagService } from './service/contract-anag.service';

@Component({
  selector: 'app-user-anag',
  templateUrl: './user-anag.component.html',
  styleUrls: ['./user-anag.component.css']
})
export class UserAnagComponent implements OnInit {

  currentAnagId = 0;
  dbAnag: any = {};
  selectedContract;
  nome = "";
  cognome = "";

  constructor(
    private route: ActivatedRoute,
    public fb: FormBuilder,
    private userAnag: UserAnagService,
    private contractAnag: ContractAnagService,
  ) { }

  anagForm = new FormGroup({
    name: new FormControl('', [Validators.required,]),
    surname: new FormControl('', [Validators.required,]),
    address: new FormControl('', [Validators.required,]),
    email: new FormControl('', [Validators.required,]),
    phonenumber1: new FormControl('', [Validators.required,]),
    phonenumber2: new FormControl('', [Validators.required,]),
    birthdate: new FormControl('', [Validators.required,]),
    birthplace: new FormControl('', [Validators.required,]),
    regnuminps: new FormControl('', [Validators.required,]),
    contracttype: new FormControl('', [Validators.required,]),
    distaccatoda: new FormControl('', [Validators.required,]),
    distaccatoa: new FormControl('', [Validators.required,]),
    sededilavoro: new FormControl('', [Validators.required,]),
    valorerimborsistimato: new FormControl('', [Validators.required,]),
    buonipastobool: new FormControl('', [Validators.required,]),
    sex: new FormControl('', [Validators.required,]),
    contractid: new FormControl('', [Validators.required,]),
  });
  // regnuminps, contracttype, distaccatoda, distaccatoa, sededilavoro, valorerimborsistimato, buonipastobool, sex, contractid,
  ngOnInit() {
    this.currentAnagId = this.getIdFromLocalStorage();
    const id = this.getIdFromLocalStorage();
    this.userAnag.getAnagraphic(id).subscribe(
      anag => {
        if (anag['status'] === "done") {
          console.log(anag["data"]);
          this.dbAnag = anag["data"];
          this.nome = this.dbAnag.name;
          this.cognome = this.dbAnag.surname;
          let newanag = {
            name: this.dbAnag.name,
            surname: this.dbAnag.surname,
            address: this.dbAnag.address,
            phonenumber1: this.dbAnag.phonenumber1,
            phonenumber2: this.dbAnag.phonenumber2,
            birthdate: this.dbAnag.birthdate,
            birthplace: this.dbAnag.birthplace,
            regnuminps: this.dbAnag.regnuminps,
            contracttype: this.anagForm.get('surname').value,
            distaccatoda: this.anagForm.get('surname').value,
            distaccatoa: this.anagForm.get('surname').value,
            sededilavoro: this.anagForm.get('surname').value,
            valorerimborsistimato: this.anagForm.get('surname').value,
            buonipastobool: this.anagForm.get('surname').value,
            sex: this.anagForm.get('surname').value,
            contractid: this.anagForm.get('surname').value,
          }
          this.anagForm.patchValue(newanag);
        } else {
          console.log("error");
        }

      },
      error => { }
    );
    if (this.dbAnag.contractid) {
      this.contractAnag.getContract(this.dbAnag.contractid).subscribe(
        res => {
          console.log(res["data"]);
          this.selectedContract = res["data"];
          this.selectedContract.tolist = this.selectedContract.title + ' '
            + this.selectedContract.contracttype + ' ' + this.selectedContract.level + ' livello ' + this.selectedContract.ccnl;
          const patch = {
            contracttype: this.selectedContract.tolist,
          };
          this.anagForm.patchValue(patch);
        },
        error => { }
      );
    } else {
      console.log("no contract found");
    }
    /*
        this.route.data.subscribe(
          data => {

          const birth = new Date(data.user.data.birthdate);


          this.profileForm = this.fb.group({
            firstName: [data.user.data.name],
            lastName: [data.user.data.surname],
            address: [data.user.data.address],

            email: [data.user.data.birthplace],
            tipologiacontratto: [data.user.data.contracttype],
            distaccatoa: [data.user.data.distaccatoa],
            sededilavoro: [data.user.data.sededilavoro],
            rimborsostimato: [data.user.data.valorerimborsistimato],
            buonipasto: [data.user.data.buonipastobool],
            phonenumber1: [data.user.data.phonenumber1],
            phonenumber2: [data.user.data.phonenumber2],
          });
        } );*/
  }

  submit() {
    let newanag = {
      id: this.anagForm.get('name').value,
      name: this.anagForm.get('name').value,
      surname: this.anagForm.get('surname').value,
      address: this.anagForm.get('surname').value,
      phonenumber1: this.anagForm.get('surname').value,
      phonenumber2: this.anagForm.get('surname').value,
      birthdate: this.anagForm.get('surname').value,
      birthplace: this.anagForm.get('surname').value,
      regnuminps: this.anagForm.get('surname').value,
      contracttype: this.anagForm.get('surname').value,
      distaccatoda: this.anagForm.get('surname').value,
      distaccatoa: this.anagForm.get('surname').value,
      sededilavoro: this.anagForm.get('surname').value,
      valorerimborsistimato: this.anagForm.get('surname').value,
      buonipastobool: this.anagForm.get('surname').value,
      sex: this.anagForm.get('surname').value,
      contractid: this.anagForm.get('surname').value,
    }
    console.log(newanag);
  }

  get fc() { return this.anagForm.controls; }

  getIdFromLocalStorage() {
    const tmp = localStorage.getItem('currentUser');
    const tmpArray = JSON.parse(tmp);
    return tmpArray.anagraphicid;
  }

  getEmailFromLocalStorage() {
    const tmp = localStorage.getItem('currentUser');
    const tmpArray = JSON.parse(tmp);
    return tmpArray.email;
  }
}
