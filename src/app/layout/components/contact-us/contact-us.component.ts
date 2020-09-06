import { Component, OnInit } from '@angular/core';
import { ContactUsData } from '../../models/contact-us-data.model';
import { ContactUsService } from '../../services/contact-us.service';
import { ContactInfo } from '../../models/contact-info.model';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {

  contactUsDataModel: ContactUsData;//Displaying of Company's data
  contactInfo: ContactInfo = new ContactInfo();//Generate User Contact Info

  constructor(private _contactUsService: ContactUsService) { }

  ngOnInit(): void {
    // this.getFirst();
    this.contactUsDataModel = this.getDummyData();
  }

  getFirst() {
    this._contactUsService.getFirst().subscribe(res => {
      this.contactUsDataModel = res;
    })
  }

  getDummyData(): ContactUsData {

    return {
      Id: 1,
      Address: "Elforsan City, Kattamya, Cairo. (Sales Office)",
      SecondAddress: "Wadi Elrayan, Fayoum. (Farm Location)",
      Email: "Asdiaafarm@gmail.com",
      Phone: "(002)01011949992",
      FacebookLink: "https://www.facebook.com",
      LinkedinLink: "https://www.linkedin.com",
      TwitterLink: "https://www.twitter.com",
      InstagramLink: "https://www.instagram.com",
    }
  }

}
