import { Component, OnInit,NgModule } from '@angular/core';
import { UserProfileModel } from '../../../authentication/models/user-profile.model';
import { AuthService } from '../../../authentication/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-contact-info',
  templateUrl: './edit-contact-info.component.html',
  styleUrls: ['./edit-contact-info.component.scss']
})
export class EditContactInfoComponent implements OnInit {
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
  saveEditContactInfo(){
    //this.getUserById();
    //console.log(this.userProfileModel);
    this.router.navigate(["/profile"]);
  }
}
