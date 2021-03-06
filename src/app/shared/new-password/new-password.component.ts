import { ToastrService } from 'ngx-toastr';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: "app-new-password",
  templateUrl: "./new-password.component.html",
  styleUrls: ["./new-password.component.css"],
})
export class NewPasswordComponent implements OnInit {
  //password
  pswType: string = "password";
  checkPswType: string = "password";
  oldPswType: string = "password";
  id: string = "";
  submited: boolean = false;
  isUser: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<NewPasswordComponent>,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    if(this.data.userid != null){
      this.id = this.data.userid;
    }
    this.isUser = this.data.isUser
  }

  //mostro o nascondo la password a seconda dei casi
  pswHideShow() {
    if (this.pswType === "password") {
      this.pswType = "text";
    } else {
      this.pswType = "password";
    }
  }

  //mostro o nascondo la password a seconda dei casi
  checkPswHideShow() {
    if (this.checkPswType === "password") {
      this.checkPswType = "text";
    } else {
      this.checkPswType = "password";
    }
  }

  oldPswHideShow() {
    if (this.oldPswType === "password") {
      this.oldPswType = "text";
    } else {
      this.oldPswType = "password";
    }
  }

  submit(f) {
    this.submited = true;
    if (f.value.password === f.value.checkPassword) {
      if (f.value.password.length >= 6) {
        if (this.isUser === false) {
          this.dialogRef.close({
            data: { userId: this.id, newPassword: f.value.password },
          });
        } else {
          this.dialogRef.close({
            data: {
              newPassword: f.value.password,
              oldPassword: f.value.oldpassword,
            },
          });
        }
      }
    } else {
      this.toastrService.error("le password non combaciano");
    }
  }

  close() {
    this.dialogRef.close("close");
  }
}
