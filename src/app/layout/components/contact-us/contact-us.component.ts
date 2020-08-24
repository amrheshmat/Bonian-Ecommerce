import { Component, OnInit } from '@angular/core';
import { ContactUs } from '../../models/contact-us.model';
import { ContactUsService } from '../../services/contact-us.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {

  contactUsModel : ContactUs;

  constructor(private _contactUsService: ContactUsService) { }

  ngOnInit(): void {
    this.get();
  }

  get(){
    this.contactUsModel = this._contactUsService.get();
  }

}
