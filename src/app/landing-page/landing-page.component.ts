import { Component, OnInit } from '@angular/core'; 
import * as $ from 'jquery' ;

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {


  mySlideImages = ['../../assets/images/slider1.jpg','../../assets/images/slider2.jpg','../../assets/images/slider3.jpg','../../assets/images/slider2.jpg'];
 
  mySlideOptions={
    items:1,
    rtl: ($('html').css('direction') === 'rtl') ? true : false,
    margin: 10, 
    autoplay:true,
    dots: false
  }
  
  constructor() { }
  
  ngOnInit(): void {
    $(document).ready(function(){
      let windowHeight = $(window).height();
      $('.slick-item').height(windowHeight); 
    })

    
  }

}
