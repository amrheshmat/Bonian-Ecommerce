import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../authentication/services/auth.service';
import { UserProfileModel } from '../../authentication/models/user-profile.model';
import { ActivatedRoute, Router } from '@angular/router';
import { EditAccountInfoComponent } from './edit-account-info/edit-account-info.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  userProfileModel: UserProfileModel = new UserProfileModel();
  constructor(
    private router: Router,
    public dialog: MatDialog,
    private authService: AuthService,
  ) {
    this.getUserById();
  }

  ngOnInit(): void {
    
  }

  
  getUserById() {
    this.userProfileModel = this.authService.getUserProfileFromLocalStorage();//Get User From Local Storage
  }
  editAccountInfo(){
    this.router.navigate(["/editAccountInfo"]);
  }
  editPersonalInfo(){
    this.router.navigate(["/editPersonalInfo"]);
  }
  editContactInfo(){
    this.router.navigate(["/editContactInfo"]);
  }
}
