import { MatDialog } from "@angular/material/dialog";
import { NewPasswordComponent } from "./../../shared/new-password/new-password.component";
import { ToastrService } from "ngx-toastr";
import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { UserAnagService } from "./service/user-anag.service";
import { ContractAnagService } from "./service/contract-anag.service";
import { AuthenticationService } from "@app/services/authentication.service";
import { User } from "@app/models/user";

@Component({
  selector: "app-user-anag",
  templateUrl: "./user-anag.component.html",
  styleUrls: ["./user-anag.component.css"],
})
export class UserAnagComponent implements OnInit {
  currentAnagId = 0;
  dbAnag: any = {};
  selectedContract;
  nome = "";
  cognome = "";
  workplaceId = 0;
  data: any;
  contratto: any;

  submitted: boolean = false;

  constructor(
    private toastrService: ToastrService,
    private route: ActivatedRoute,
    public fb: FormBuilder,
    private userAnag: UserAnagService,
    private contractAnag: ContractAnagService,
    private authenticationService: AuthenticationService,
    public dialog: MatDialog
  ) {}

  anagForm = new FormGroup({
    name: new FormControl("", [Validators.required]),
    surname: new FormControl("", [Validators.required]),
    address: new FormControl("", [Validators.required]),
    email: new FormControl("", [Validators.required]),
    phonenumber1: new FormControl("", [Validators.required]),
    phonenumber2: new FormControl("", [Validators.required]),
    birthdate: new FormControl("", [Validators.required]),
    birthplace: new FormControl("", [Validators.required]),
    regnuminps: new FormControl("", [Validators.required]),
    contracttype: new FormControl("", [Validators.required]),
    distaccatoda: new FormControl("", [Validators.required]),
    distaccatoa: new FormControl("", [Validators.required]),
    sededilavoro: new FormControl("", [Validators.required]),
    valorerimborsistimato: new FormControl("", [Validators.required]),
    buonipastobool: new FormControl("", [Validators.required]),
    sex: new FormControl("", [Validators.required]),
    contractid: new FormControl("", [Validators.required]),
  });
  ngOnInit() {
    this.currentAnagId = this.getIdFromLocalStorage();
    const id = this.getIdFromLocalStorage();
    const emails = this.getEmailFromLocalStorage();
    this.userAnag.getAnagraphic(id).subscribe(
      (anag) => {
        if (anag["status"] === "done") {
          //console.log("anag[data]", anag["data"]);
          //console.log("anag[data]", anag["data"].buonipastobool);

          this.dbAnag = anag["data"];

          //flag buonipasto
          this.dbAnag.buonipastobool =
            anag["data"].buonipastobool == 0 ? false : true;

          this.nome = this.dbAnag.name;
          this.cognome = this.dbAnag.surname;
          this.workplaceId = this.dbAnag.sededilavoro;
          //console.log("dbAnag", this.dbAnag);
          let newanag = {
            name: this.dbAnag.name,
            surname: this.dbAnag.surname,
            address: this.dbAnag.address,
            email: emails,
            phonenumber1: this.dbAnag.phonenumber1,
            phonenumber2: this.dbAnag.phonenumber2,
            birthdate: this.dbAnag.birthdate,
            birthplace: this.dbAnag.birthplace,
            regnuminps: this.dbAnag.regnuminps,
            contracttype: this.dbAnag.contracttype,
            distaccatoda: this.anagForm.get("surname").value,
            distaccatoa: this.anagForm.get("surname").value,
            sededilavoro: this.anagForm.get("surname").value,
            valorerimborsistimato: this.anagForm.get("surname").value,
            buonipastobool: this.dbAnag.buonipastobool,
            sex: this.anagForm.get("surname").value,
            contractid: this.dbAnag.contractid,
            economicdataid: this.dbAnag.economicdataid,
          };

          //prendo il contratto
          this.getContract(this.dbAnag.contractid);

          //onsole.log("newanag", newanag);
          this.userAnag.getWorkOffice(this.workplaceId).subscribe((res) => {
            //console.log("res", res.data);
            newanag.sededilavoro = res.data.address;
            this.anagForm.patchValue(newanag);
          });
          //console.log(newanag);
          //this.anagForm.patchValue(newanag);
        } else {
          //console.log("error");
        }
      },
      (error) => {}
    );
    if (this.dbAnag.contractid) {
      this.contractAnag.getContract(this.dbAnag.contractid).subscribe(
        (res) => {
          //console.log(res["data"]);
          this.selectedContract = res["data"];
          this.selectedContract.tolist =
            this.selectedContract.title +
            " " +
            this.selectedContract.contracttype +
            " " +
            this.selectedContract.level +
            " livello " +
            this.selectedContract.ccnl;
          const patch = {
            contracttype: this.selectedContract.tolist,
          };
          this.anagForm.patchValue(patch);
        },
        (error) => {}
      );
    } else {
      //console.log("no contract found");
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
    this.submitted = true;
    if (
      this.anagForm.get("birthplace").value.length > 1 &&
      this.anagForm.get("address").value.length > 1
    ) {
      let newanag = {
        id: this.dbAnag.id,
        name: this.dbAnag.name,
        surname: this.dbAnag.surname,
        address: this.anagForm.get("address").value,
        phonenumber1: this.anagForm.get("phonenumber1").value,
        phonenumber2: this.anagForm.get("phonenumber2").value,
        birthdate: this.updBirthdate(this.dbAnag.birthdate),
        birthplace: this.anagForm.get("birthplace").value,
        regnuminps: this.dbAnag.regnuminps,
        contracttype: this.dbAnag.contracttype,
        distaccatoda: this.dbAnag.distaccatoda,
        distaccatoa: this.dbAnag.distaccatoa,
        sededilavoro: this.dbAnag.sededilavoro,
        valorerimborsistimato: this.dbAnag.valorerimborsistimato,
        buonipastobool: this.dbAnag.buonipastobool,
        sex: this.dbAnag.sex,
        contractid: this.dbAnag.contractid,
        economicdataid: this.dbAnag.economicdataid,
      };

      this.userAnag
        .updateAnagraphicForUser(newanag)
        .subscribe(() => this.toastrService.success("Utente aggiornato"));
    } else {
      this.toastrService.error("Inserire i campi obbligatori");
    }
  }

  get fc() {
    return this.anagForm.controls;
  }

  getIdFromLocalStorage() {
    //const tmp = localStorage.getItem('currentUser');
    //const tmpArray = JSON.parse(tmp);
    //return tmpArray.anagraphicid;
    return this.authenticationService.currentUserValue.anagraphicid;
  }

  getEmailFromLocalStorage() {
    const user: User = this.authenticationService.currentUserValue;
    return user.email;
  }

  //quando la data viene cambiata catturo l'evento
  changeData(dataEvent) {
    //console.log("dataEvent", dataEvent.value)
    this.data = new Date(dataEvent.value).toISOString();
    //console.log(this.data);
  }

  //se l'utente modifica la data aggiorno la vecchia data di nascita
  updBirthdate(birthdate) {
    if (this.data != null) {
      birthdate = this.data;
    }
    return birthdate;
  }

  //dato un id di un contratto restituisce i dati del contratto
  getContract(id) {
    this.contractAnag.getContract(id).subscribe((res) => {
      //console.log("contratto GET" , res["data"])
      let contrattoData = res["data"];
      //console.log("contrattoData" , contrattoData )
      //se il contratto che ,i arriva è undefinied ritornera nessun contratto
      if (
        contrattoData.title == undefined &&
        contrattoData.contracttype == undefined &&
        contrattoData.level == undefined &&
        contrattoData.ccnl == undefined
      ) {
        this.contratto = "Nessun contratto";
      } else {
        this.contratto =
          contrattoData.title +
          " " +
          contrattoData.contracttype +
          " " +
          contrattoData.level +
          " " +
          "livello" +
          " " +
          contrattoData.ccnl;
      }

      //console.log("this.contratto" , this.contratto )
    });
  }

  updatePassword() {
    const dialogRef = this.dialog.open(NewPasswordComponent, {
      width: "600px",
      data: {
        userid: null,
        isUser: true,
      },
    });
    dialogRef.afterClosed().subscribe((password) => {
      if (password && password != "close") {
        this.userAnag.changePassword(password["data"].newPassword, password["data"].oldPassword)
          .subscribe((res) => {
            if ((res["status"] === "done")) {
              this.toastrService.success("password salvata con successo");
            }
            if ((res["status"] === "error")) {
              this.toastrService.error(res["message"]);
            }
          });
      }
    });
  }
}
