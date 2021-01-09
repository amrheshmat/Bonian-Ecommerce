import { Component, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from '../../services/auth.service';
import { LoginModel } from '../../models/login.model';
import { AlertService } from '../../../../shared/services/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  clicked = false;
  loginModel: LoginModel = new LoginModel();
  constructor(private router: Router,
    private authService: AuthService,
    private alertService: AlertService) {

  }

  login(form: NgForm) {
    // let credentials = JSON.stringify(form.value);
    this.loginModel.email = '';
    this.authService.login(this.loginModel).subscribe(response => {
      // response.UserModel = this.generateUserModel();
      // response.Success = false;
      if (response && response.Success) {
        let token = (<any>response).Token;
        localStorage.setItem("jwt", token);
        this.authService.setUserProfileInLocalStorage(response.UserModel)
        this.router.navigate(["/"]);
        this.alertService.showSuccess("Login Successfully", "Success")
      }
      else {
        this.alertService.showError("Invalid Email Or Password !", "Error")
      }
    }, err => {
      this.alertService.showError("Invalid Email Or Password !", "Error")
    });
  }

  generateUserModel() {
    let userProfileModel = {
      UserName: 'mahmoudali',
      UserId: 12,
      Email: 'asdasd2312@gmail.com',
      Mobile: '+20101203123',
      ProfileName: 'dddd',
      Address: 'dddd1',
      DistrictId: 1
    };
    return userProfileModel;
  }

}
