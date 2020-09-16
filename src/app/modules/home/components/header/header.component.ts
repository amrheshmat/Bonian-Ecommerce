import { Component, OnInit, AfterViewInit } from '@angular/core';

import * as $ from 'jquery';
import { HeaderService } from '../../services/header.service';
import { Header } from '../../models/header.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, AfterViewInit {
  siderImages: Header[];
  sliderOptions: any;

  constructor(private _headerService: HeaderService) { }

  ngOnInit(): void {
    // this.getAll();
    this.siderImages = this.getDummyData();
    
    this.sliderOptions = {
      items: 1,
      rtl: ($('html').css('direction') === 'rtl') ? true : false,
      margin: 10,
      autoplay: true,
      dots: false
    }
  }

  ngAfterViewInit(): void {
    let windowHeight = $(window).height();
    $('.slick-item').height(windowHeight);
  }

  private getAll() {
    this._headerService.getAll().subscribe(res => {
      this.siderImages = res;
    })
  }

  getDummyData(): Header[] {
    return [
      { Id: 1, ImagePath: "images/slider1.jpg" },
      { Id: 2, ImagePath: "images/slider2.jpg" },
      { Id: 3, ImagePath: "images/slider3.jpg" }
    ]
  }
}
