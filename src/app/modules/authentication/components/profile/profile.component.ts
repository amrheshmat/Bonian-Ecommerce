import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Customer } from '../../../cart/models/customer.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserProfileModel } from '../../models/user-profile.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent {

  userProfileModel: UserProfileModel = new UserProfileModel();
  constructor(private router: Router,
    private authService: AuthService,
    public dialogRef: MatDialogRef<ProfileComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.getUserById();
  }


  close(): void {
    this.dialogRef.close();
  }

  getUserById() {
    this.userProfileModel = this.authService.getUserProfileFromLocalStorage();//Get User From Local Storage
    // this.authService.getUserById(user.UserId).subscribe(response => {
    //   this.userProfileModel = response;
    // }, err => {
    // });
  }

  logOut() {
    this.authService.clearLocalStorage();
    this.close();
    this.router.navigateByUrl('/auth/login');
  }
}
