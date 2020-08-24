import { Injectable } from '@angular/core';
import { ContactUs } from '../models/contact-us.model';

@Injectable({
  providedIn: 'root'
})
export class ContactUsService {
  contactUsModel: ContactUs;

  constructor() { }

  get():ContactUs{
   
    return {
      Id:1,
      Address:"Elforsan City, Kattamya, Cairo. (Sales Office)",
      SecondAddress:"Wadi Elrayan, Fayoum. (Farm Location)",
      Email:"Asdiaafarm@gmail.com",
      Phone:"(002)01011949992",
      FacebookLink:"https://www.facebook.com",
      LinkedinLink:"https://www.linkedin.com",
      TwitterLink:"https://www.twitter.com",
      InstagramLink:"https://www.instagram.com",
    }
  }
}
