import { Component, OnInit, AfterViewInit } from '@angular/core';

import * as $ from 'jquery';
import { SpecialOffer } from '../../models/special-offers.model';
import { SpecialOffersService } from '../../services/special-offers.service';

@Component({
  selector: 'app-special-offers',
  templateUrl: './special-offers.component.html',
  styleUrls: ['./special-offers.component.scss']
})
export class SpecialOffersComponent implements OnInit, AfterViewInit {

  specialOffersList: SpecialOffer[];
  constructor(private _specialOffersService: SpecialOffersService) { }

  ngOnInit(): void {
    // this.getAll();
    this.specialOffersList = this.getDummyData();
  }

  ngAfterViewInit() {

  }

  getAll() {
    this._specialOffersService.getAll().subscribe(res => {
      this.specialOffersList = res;
    })
  }

  getDummyData(): SpecialOffer[] {
    return [
      { Id: 1, ImagePath: "./assets/images/apples-buy-customer-95425.jpg", Precentage: 30, Category: "Meet" },
      { Id: 2, ImagePath: "./assets/images/asian-assorted-background-917371.jpg", Precentage: 25, Category: "Fowl" },
      { Id: 3, ImagePath: "./assets/images/apples-buy-customer-95425.jpg", Precentage: 10, Category: "Seed" },
      { Id: 4, ImagePath: "./assets/images/asian-assorted-background-917371.jpg", Precentage: 25, Category: "Fowl" },
    ]
  }

  slideConfig = {
    "rtl": ($('html').css('direction') === 'rtl') ? true : false,
    "slidesToShow": 3,
    "slidesToScroll": 1,
    "autoplay": true,
    "arrows": true,
    "infinite": true,
    "responsive": [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };



  slickInit(e) {
    console.log('slick initialized');
  }

  breakpoint(e) {
    console.log('breakpoint');
  }

  afterChange(e) {
    console.log('afterChange');
  }

  beforeChange(e) {
    console.log('beforeChange');
  }


}
