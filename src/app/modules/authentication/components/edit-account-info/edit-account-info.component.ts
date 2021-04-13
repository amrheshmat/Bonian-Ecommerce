import { Component, OnInit,NgModule } from '@angular/core';
import { UserProfileModel } from '../../models/user-profile.model';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AccountInfo } from '../../models/account-infoModel';
import { AlertService } from 'src/app/shared/services/alert.service';

@Component({
  selector: 'app-edit-account-info',
  templateUrl: './edit-account-info.component.html',
  styleUrls: ['./edit-account-info.component.scss']
})
export class EditAccountInfoComponent implements OnInit {
  accountInformation: AccountInfo = new AccountInfo();
  userProfileModel: UserProfileModel = new UserProfileModel();
  constructor(private router: Router,private authService: AuthService, private alertService: AlertService) { 
    this.getUserById();
  }

 

  ngOnInit(): void {
   this.getUserById();
   this.accountInformation.fullName =this.userProfileModel.ProfileName;
   this.accountInformation.Email =this.userProfileModel.Email;
   this.accountInformation.Password =this.userProfileModel.Password;
   this.accountInformation.UserName =this.userProfileModel.Username;
  }
  getUserById() {
    this.userProfileModel = this.authService.getUserProfileFromLocalStorage();//Get User From Local Storage
  }
  saveEditAccountInfo(){
  //  console.log(this.accountInformation);
   
   this.userProfileModel.ProfileName = this.accountInformation.fullName; 
    this.userProfileModel.Username = this.accountInformation.UserName; 
    this.userProfileModel.Email = this.accountInformation.Email;
    this.userProfileModel.Password = this.accountInformation.Password;
    this.authService.updateAccountInfo(this.userProfileModel).subscribe(res=>{ 
      if(res==-2){
      this.alertService.showError("UserName Or Email Already exists !", "Error");
    }else{
      this.authService.setUserProfileInLocalStorage(this.userProfileModel);
      this.alertService.showSuccess("Update successfully", "Success");
      this.router.navigate(["/auth/profile"]);
    }
    });
   // 
  }
}
