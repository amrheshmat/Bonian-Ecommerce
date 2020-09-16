import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as $ from 'jquery';
import { TestimonialService } from '../../services/testimonial.service';
import { Testimonial } from '../../models/testimonial.model';

@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.scss']
})
export class TestimonialsComponent implements OnInit, AfterViewInit {
  TestimonialList: Testimonial[];

  constructor(private _testimonialService: TestimonialService) { }

  ngOnInit(): void {
    // this.getAll();
    this.TestimonialList = this.getDummyData();
  }


  getAll(): void {
    this._testimonialService.getAll().subcribe(res => {
      this.TestimonialList = res;
    })
  }

  ngAfterViewInit() {
    this.testimonialsSlider();
  }

  getDummyData(): Testimonial[] {
    return [
      { Id: 2, CustomerName: "Tomas Arther", CustomerJobTitle: "UI/UX Designer", Testimonial: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis ", ImagePath: "images/p1.jpg", Description: null },

      { Id: 4, CustomerName: "Sarah Brad", CustomerJobTitle: "UI/UX Designer", Testimonial: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis ", ImagePath: "images/p2.jpg", Description: null },

      { Id: 2, CustomerName: "Rafael Alekhandro", CustomerJobTitle: "Back-end Developer", Testimonial: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis ", ImagePath: "images/p1.jpg", Description: null },
    ]
  }

  testimonialsSlider() {
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
