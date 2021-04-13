import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/shared/services/alert.service';
import { ChangePassword } from '../../models/change-password';
import { UserProfileModel } from '../../models/user-profile.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  changePass:  ChangePassword = new ChangePassword();
  userProfileModel: UserProfileModel = new UserProfileModel();
  constructor(private authService: AuthService,private alertService:AlertService,private router: Router) { }

  ngOnInit(): void {
    this.getUserById();
    this.changePass.userId=this.userProfileModel.UserID;
  }
  getUserById() {
    this.userProfileModel = this.authService.getUserProfileFromLocalStorage();//Get User From Local Storage
  }
  changePassword(){
    if(this.changePass.newPassword == this.changePass.confirmPassword){
      
      this.authService.changePasswordApi(this.changePass).subscribe(res=>{ 
        if(res==1){
          this.alertService.showSuccess("password changed successfully", "Success");
          this.router.navigate(["/"]);
      }else{
        this.alertService.showError("password not correct!", "Error");
      }
      });
    }else{
      this.alertService.showError("password doesn't match!", "Error");
    }
  }
}
