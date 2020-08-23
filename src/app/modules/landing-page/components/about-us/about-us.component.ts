import { Component, OnInit } from '@angular/core';
import { AboutUs } from '../../models/about-us.model';
import { AboutUsService } from '../../services/about-us.service';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit {

  aboutUsModel : AboutUs;

  constructor(private _aboutUsService: AboutUsService) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll():void{
    this.aboutUsModel = this._aboutUsService.getAll();
  }

}
