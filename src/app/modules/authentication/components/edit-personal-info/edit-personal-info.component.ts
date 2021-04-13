import { Component, OnInit,NgModule } from '@angular/core';
import { UserProfileModel } from '../../models/user-profile.model';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { PersonalInfo } from '../../models/personal-infoModel';

@Component({
  selector: 'app-edit-personal-info',
  templateUrl: './edit-personal-info.component.html',
  styleUrls: ['./edit-personal-info.component.scss']
})
export class EditPersonalInfoComponent implements OnInit {
  userProfileModel: UserProfileModel = new UserProfileModel();
  personalInformation: PersonalInfo = new PersonalInfo();
  constructor(private router: Router,private authService: AuthService,) { 
    
  }

 

  ngOnInit(): void {
    
   this.getUserById();
   this.personalInformation.fullName =this.userProfileModel.ProfileName;
  }
  getUserById() {
    this.userProfileModel = this.authService.getUserProfileFromLocalStorage();//Get User From Local Storage
  }
  saveEditPersonalInfo() {
    this.router.navigate(["/auth/profile"]);
  }

}
