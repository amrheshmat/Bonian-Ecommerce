import { Component, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from '../../services/auth.service';
import { RegsiterModel } from '../../models/register.model';
import { UserProfileModel } from '../../models/user-profile.model';
import { AlertService } from '../../../../shared/services/alert.service';
import { response } from 'express';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  clicked = false;
  registerModel: RegsiterModel = new RegsiterModel();
  userProfileModel: UserProfileModel = new UserProfileModel();
  constructor(private router: Router, private authService: AuthService,
    private alertService: AlertService) {

  }

  register(form: NgForm) {
    // let userData = JSON.stringify(form.value);
    // this.authService.register(userData).subscribe(response => {
    //   let token = (<any>response).token;
    //   localStorage.setItem("jwt", token);
    //   this.router.navigate(["/layout/dashboard"]);
    // }, err => {
    // });
    this.authService.setUserProfileInLocalStorage(this.userProfileModel)
    this.userProfileModel.DistrictId = Math.floor((Math.random() * 100000) + 1);
    this.authService.register(this.userProfileModel).subscribe(response => {
      let success = (<any>response).Success;
      if (success) {
        let token = (<any>response).Data.Token;
        localStorage.setItem("jwt", token); 
        this.userProfileModel = (<any>response).UserModel;
        this.authService.setUserProfileInLocalStorage(this.userProfileModel);
        this.router.navigate(["/"]);
        this.alertService.showSuccess("Login Successfully", "Success");

      }
    }, err => {
      this.alertService.showError("Invalid Email Or Password !", "Error")
    });
  }
}
