import { Component, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from '../../services/auth.service';
import { LoginModel } from '../../models/login.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  invalidLogin: boolean = false;//For showing or error message in case invalid username or password
  clicked = false;
  loginModel: LoginModel = new LoginModel();
  constructor(private router: Router, private authService: AuthService) {

  }

  login(form: NgForm) {
    // let credentials = JSON.stringify(form.value);
    this.authService.login(this.loginModel).subscribe(response => {
      response.UserModel = this.generateUserModel();
      response.Success = true;
      if (response && response.Success) {

        let token = (<any>response).Token;
        localStorage.setItem("jwt", token);
        this.authService.setUserProfileInLocalStorage(response.UserModel)
        this.invalidLogin = false;
        this.router.navigate(["/"]);
      }
      else {
        this.invalidLogin = true;
      }
    }, err => {
      this.invalidLogin = true;
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
