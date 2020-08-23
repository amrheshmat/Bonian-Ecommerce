import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery' ;

@Component({
  selector: 'app-landin-page-header',
  templateUrl: './landin-page-header.component.html',
  styleUrls: ['./landin-page-header.component.scss']
})
export class LandinPageHeaderComponent implements OnInit {
  mySlideImages:any[];
  mySlideOptions:any;
  
  constructor() { }

  ngOnInit(): void {
     
  this.mySlideImages = ['./assets/images/slider1.jpg','./assets/images/slider2.jpg','./assets/images/slider3.jpg','./assets/images/slider2.jpg'];
 
  this.mySlideOptions={
    items:1,
    rtl: ($('html').css('direction') === 'rtl') ? true : false,
    margin: 10, 
    autoplay:true,
    dots: false
  }
  }

}
