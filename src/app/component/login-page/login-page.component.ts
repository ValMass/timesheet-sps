import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '@app/services/authentication.service';
import { first } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Component({
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private toastrService: ToastrService
  ) {
    if (this.authenticationService.currentUserValue) {
      let user = this.authenticationService.currentUserValue;
      console.log(user.isadmin);
      switch (user.isadmin) {
        case '1':
          console.log('primascelta');
          this.router.navigate(['/home-page']);
          break;
        case '2':
          this.router.navigate(['/timesheet-page']);
          break;

        default:
          console.log('error');
          break;
      }


      /* if( user.isadmin = 1) {
         this.router.navigate(['/timesheet-page']);
       } else {
         this.router.navigate(['/timesheet-page']);
       }*/

    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  tryLogin() {

  }
  get f() { return this.loginForm.controls; }


  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    //if (this.loginForm.invalid) {
    //    return;
    //}

    this.loading = true;
    this.authenticationService.login(this.f.username.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        data => {
          if (data.token == null) {
            this.toastrService.error('not logged');
          } else {
            this.router.navigate([this.returnUrl]);
          }

        },
        error => {
          this.error = error;
          this.loading = false;
        });
  }
}
