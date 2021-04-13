import { Component, OnInit,NgModule } from '@angular/core';
import { UserProfileModel } from '../../models/user-profile.model';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactInfo } from '../../models/contact-infoModel';
import { AlertService } from 'src/app/shared/services/alert.service';

@Component({
  selector: 'app-edit-contact-info',
  templateUrl: './edit-contact-info.component.html',
  styleUrls: ['./edit-contact-info.component.scss']
})
export class EditContactInfoComponent implements OnInit {
  delievryInfo :any = [];
  selected : number;
  countryList: any = [];
  areaList: any = [];
  cityList: any = [];
  districtList: any = [];
  contactInformation: ContactInfo = new ContactInfo();
  userProfileModel: UserProfileModel = new UserProfileModel();
  constructor(private router: Router,private authService: AuthService, private alertService: AlertService) { 
    this.getUserById();
  }

 

  ngOnInit(): void {
   this.getUserById();
   this.getDelievryInformationInfo();
   this.contactInformation.ProfileId = this.userProfileModel.ProfileID;
   //console.log(this.contactInformation.ProfileId);
   this.getRegistrationLookUp();
  }
  
  getRegistrationLookUp() {
    this.authService.getRegistrationLookUp().subscribe(res => {
      this.prepareLoockups(res);
    });
  }

  prepareLoockups(res) {
    this.countryList = res['CountryIndexViewModel'].CountryList;
    
    this.areaList = res['AreaIndexViewModel'].AreaList;
    this.cityList = res['CityIndexViewModel'].CityList;
    this.districtList = res['DistrictIndexViewModel'].DistrictList;
  }
  getUserById() {
    this.userProfileModel = this.authService.getUserProfileFromLocalStorage();//Get User From Local Storage
  }
  getDelievryInformationInfo() {
    this.getUserById();
    this.authService.getDelievryInformationByProfileId(this.userProfileModel.ProfileID).subscribe(res=>{ 
      this.delievryInfo =res;
      for(let i of res){
        if(i.IsDefault == true){
          this.selected = i.Id;
          this.authService.updateUserDefaultDeliveryInfoInLocalStorage(i);
        }
        
      }
    });
  }

  deleteAddress(AddresId : number){
    this.authService.deleteDeliveryInformation(AddresId).subscribe(res=>{ 
      if(res==-2){
      this.alertService.showError("Invalid Value !", "Error");
    }else{
      this.getDelievryInformationInfo();
      this.alertService.showSuccess("Deleted successfully", "Success");
    }
    });
  }
  saveEditContactInfo(){
    if(!this.contactInformation.Address || !this.contactInformation.DistrictId){
      this.alertService.showError("Required Value !", "Error");
    }else{
      this.authService.addDeliveryInformation(this.contactInformation).subscribe(res=>{ 
        if(res==-2){
        this.alertService.showError("Invalid Value !", "Error");
      }else{
        this.getDelievryInformationInfo();
        this.alertService.showSuccess("Added successfully", "Success");
       //this.router.navigate(["/auth/profile"]);
      }
      });
    }
  }
  updateDefaultAddress(){
    this.contactInformation.ProfileId = this.userProfileModel.ProfileID;
    this.contactInformation.Id = this.selected;
      this.authService.updateDefaultDeliveryInformation(this.contactInformation).subscribe(res=>{ 
        if(res==-2){
        this.alertService.showError("Invalid Value !", "Error");
      }else{
        this.getDelievryInformationInfo();
        this.alertService.showSuccess("Update successfully", "Success");
      }
      });
  }
}
