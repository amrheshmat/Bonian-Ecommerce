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
      let token = (<any>response).Token;
      localStorage.setItem("jwt", token);
      this.invalidLogin = false;
      this.router.navigate(["/"]);
    }, err => {
      this.invalidLogin = true;
    });
  }
}
