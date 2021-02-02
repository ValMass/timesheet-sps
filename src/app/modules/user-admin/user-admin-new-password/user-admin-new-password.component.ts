import { ToastrService } from 'ngx-toastr';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-admin-new-password',
  templateUrl: './user-admin-new-password.component.html',
  styleUrls: ['./user-admin-new-password.component.css']
})
export class UserAdminNewPasswordComponent implements OnInit {

  //password
  psw: string = "password";
  checkPsw : string = "password";
  id : string = '';
  submited : boolean = false;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef <UserAdminNewPasswordComponent>,
    private toastrService: ToastrService,
  ) { }

  ngOnInit(): void {
    this.id = this.data.userid;
  }

  //mostro o nascondo la password a seconda dei casi
  pswHideShow() {
    if (this.psw === "password") {
      this.psw = "text";
    } else {
      this.psw = "password";
    }
  }

  //mostro o nascondo la password a seconda dei casi
  checkPswHideShow() {
    if (this.checkPsw === "password") {
      this.checkPsw = "text";
    } else {
      this.checkPsw = "password";
    }
  }

  submit(f){
    this.submited = true
    if(f.value.password === f.value.checkPassword){
      if(f.value.password.length >= 6){
        this.dialogRef.close({ data: {userId : this.id , newPassword : f.value.password} });
      }
    }else{
      this.toastrService.error('le password non combaciano');
    }
  }

  close() {
    this.dialogRef.close("close");
  }
}
