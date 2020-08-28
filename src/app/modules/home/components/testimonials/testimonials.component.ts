import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as $ from 'jquery' ;
import { TestimonialService } from '../../services/testimonial.service';
import { Testimonial } from '../../models/testimonial.model';

@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.scss']
})
export class TestimonialsComponent implements OnInit , AfterViewInit  {
  TestimonialList:Testimonial[];

  constructor(private _testimonialService : TestimonialService) { }

  ngOnInit(): void {
    this.getAll(); 
  }
  

  getAll(): void{
    this.TestimonialList = this._testimonialService.getAll(); 
  } 
  
  ngAfterViewInit(){
    this.testimonialsSlider(); 
  }

  testimonialsSlider(){
    let actived = $('.f-slider >  div:first-child');
    actived.addClass('activ');
    (function autoSlider() {
        
        $('.f-slider .activ').each(function () {
            if (!$(this).is(':last-child')) {
                $(this).delay(3000).fadeOut(1000, function () {
    
                    $(this).removeClass('activ').next().addClass('activ').fadeIn(1000);
    
                    autoSlider();
                });
    
            } else {
    
                $(this).delay(3000).fadeOut(1000, function () {
    
                    $(this).removeClass('activ');
    
                    $('.f-slider div').eq(0).addClass('activ').fadeIn(1000);
    
                    autoSlider();
    
                });
    
            }
    
        });
    
    }());
  }

}
