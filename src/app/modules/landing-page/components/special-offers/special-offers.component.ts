import { Component, OnInit, AfterViewInit } from '@angular/core';

import * as $ from 'jquery' ;
import { SpecialOffer } from '../../models/special-offers.model';
import { SpecialOffersService } from '../../services/special-offers.service';

@Component({
  selector: 'app-special-offers',
  templateUrl: './special-offers.component.html',
  styleUrls: ['./special-offers.component.scss']
})
export class SpecialOffersComponent implements OnInit,AfterViewInit {

  specialOffersList : SpecialOffer[];
  constructor(private _specialOffersService: SpecialOffersService) { }

  ngOnInit(): void {
    //this.owlCarouselOffersTrigger();
    this.getAll();
  }

  ngAfterViewInit(): void{ 
    let windowHeight = $(window).height();
    $('.slick-item').height(windowHeight);   
  }

  getAll():void{
    this.specialOffersList = this._specialOffersService.getAll(); 
    debugger;
    console.log(this.specialOffersList)
  } 
//   slides = ["cl-3", "cl-2", "cl-1"];

//   slideConfig = {
//     "slidesToShow": 4,
//     "slidesToScroll": 1,
//     "nextArrow": "<div class='nav-btn next-slide'></div>",
//     "prevArrow": "<div class='nav-btn prev-slide'></div>",
//     "dots": true,
//     "infinite": false
//   };


  
//   addSlide() {
//     this.slides.push(null)
//   }

//   removeSlide() {
//     this.slides.length = this.slides.length - 1;
//   }

//   slickInit(e) {
//     console.log('slick initialized');
//   }

//   breakpoint(e) {
//     console.log('breakpoint');
//   }

  owlCarouselOffersTrigger() {
    $('.autoplay').slick({
        rtl: ($('html').css('direction') === 'rtl') ? true : false,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        prevArrow: '<i class="fas fa-arrow-circle-left fa-fw"></i>',
        nextArrow: '<i class="fas fa-arrow-circle-right fa-fw"></i>',
        responsive: [
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
    });
    
}
}
