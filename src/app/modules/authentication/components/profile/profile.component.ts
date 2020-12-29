import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Customer } from '../../../cart/models/customer.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent {

  customerModel: Customer = new Customer();
  constructor(private router: Router,
    private authService: AuthService,
    public dialogRef: MatDialogRef<ProfileComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }

  close(): void {
    this.dialogRef.close();
  }

  getUserById() {
    let userId = 1;//Get User From Local Storage
    this.authService.getUserById(userId).subscribe(response => {
      this.customerModel = response;
    }, err => {
    });
  }
}
