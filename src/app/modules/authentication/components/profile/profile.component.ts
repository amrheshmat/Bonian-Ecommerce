import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog'; 
import { ActivatedRoute, Router } from '@angular/router'; 
import { UserProfileModel } from '../../models/user-profile.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  userProfileModel: UserProfileModel = new UserProfileModel();
  selected : number;
  delievryInfo :any = [];
  constructor(
    private router: Router,
    public dialog: MatDialog,
    private authService: AuthService,
  ) {
    this.getUserById();
  }

  ngOnInit(): void {
    this.getDelievryInformationInfo();
  }

  
  getUserById() {
    this.userProfileModel = this.authService.getUserProfileFromLocalStorage();//Get User From Local Storage
  }
  editAccountInfo(){
    this.router.navigate(["/profile/editAccountInfo"]);
  }
  editPersonalInfo(){
    this.router.navigate(["/profile/editPersonalInfo"]);
  }
  editContactInfo(){
    this.router.navigate(["/profile/editContactInfo"]);
  }
  getDelievryInformationInfo() {
    this.authService.getDelievryInformationByProfileId(this.userProfileModel.ProfileID).subscribe(res=>{ 
      this.delievryInfo =res;
      for(let i of res){
        if(i.IsDefault == true){
          this.selected = i.Address;
        }
        
      }
    });
    this.userProfileModel = this.authService.getUserProfileFromLocalStorage();//Get User From Local Storage
  }
}
