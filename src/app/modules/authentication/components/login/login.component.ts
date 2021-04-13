import { Component, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from '../../services/auth.service';
import { LoginModel } from '../../models/login.model';
import { AlertService } from '../../../../shared/services/alert.service';
import { UserProfileModel } from '../../models/user-profile.model';
import { Cart } from 'src/app/modules/cart/models/cart.model';
import { CartService } from 'src/app/modules/cart/services/cart.service';
import { Item } from 'src/app/modules/products/models/products.model';
import { SalesSttings } from '../../models/sales-settings';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  clicked = false;
  salesSttings = new SalesSttings();
  cart:Item = new Item();
  loginModel: LoginModel = new LoginModel();
  userProfile: UserProfileModel = new UserProfileModel();
  constructor(private router: Router,private cartService:CartService,
    private authService: AuthService,
    private alertService: AlertService) {

  }

  login(form: NgForm) {
    // let credentials = JSON.stringify(form.value);
    this.loginModel.email = '';
    this.authService.login(this.loginModel).subscribe(response => {
      if (response != null) {
        let success = (<any>response).Success;
        if(success){
          let token = (<any>response).Data.Token;
          localStorage.setItem("jwt", token); 
          this.authService.setUserProfileInLocalStorage(response.UserModel);
          this.authService.setUserSecurityObjectInLocalStorage(response.securityObject);
          this.router.navigate(["/"]);
          this.userProfile.Username = response.UserModel.Username;
          this.userProfile = this.authService.getUserProfileFromLocalStorage();
          this.getDelievryInformationInfo(this.userProfile.ProfileID);
         this.authService.getSalesSttings().subscribe(res=>{
           this.authService.setSalesSttingsInLocalStorage(res);
         });
          this.alertService.showSuccess("Login Successfully", "Success");
        }else{
          this.alertService.showError("Invalid Email Or Password !", "Error");
        }
       
      }else{
        this.alertService.showError("Invalid Email Or Password !", "Error");
      }
    }, err => {
      this.alertService.showError("Invalid Email Or Password !", "Error");
    });

  }
 getDelievryInformationInfo(ProfileID) {
    this.authService.getDelievryInformationByProfileId(ProfileID).subscribe(res=>{ 
      for(let i of res){
        if(i.IsDefault == true){
          this.authService.setUserDefaultDeliveryInfoInLocalStorage(i);
        }
        
      }
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
