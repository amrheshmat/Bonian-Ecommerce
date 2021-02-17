import { Component, OnInit,NgModule } from '@angular/core';
import { UserProfileModel } from '../../../authentication/models/user-profile.model';
import { AuthService } from '../../../authentication/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-account-info',
  templateUrl: './edit-account-info.component.html',
  styleUrls: ['./edit-account-info.component.scss']
})
export class EditAccountInfoComponent implements OnInit {
  userProfileModel: UserProfileModel = new UserProfileModel();
  constructor(private router: Router,private authService: AuthService,) { 
    this.getUserById();
  }

  ngOnInit(): void {
   // console.log(this.userProfileModel);
  }
  getUserById() {
    this.userProfileModel = this.authService.getUserProfileFromLocalStorage();//Get User From Local Storage
  }
  saveEditAccountInfo(){
    //this.getUserById();
    //console.log(this.userProfileModel);
    this.router.navigate(["/profile"]);
  }
}
