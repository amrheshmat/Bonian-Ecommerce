import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Testimonial } from '../models/testimonial.model';

@Injectable({
  providedIn: 'root'
})
export class TestimonialService {

  constructor() { }

  getAll(): Testimonial[] {
    return [
      {Id:2, CustomerName:"Tomas Arther", CustomerJobTitle:"UI/UX Designer", Testimonial:"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis ", ImagePath:"images/p1.jpg", Description:null},

      {Id:4, CustomerName:"Sarah Brad", CustomerJobTitle:"UI/UX Designer", Testimonial:"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis ", ImagePath:"images/p2.jpg", Description:null},

      {Id:2, CustomerName:"Rafael Alekhandro", CustomerJobTitle:"Back-end Developer", Testimonial:"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis ", ImagePath:"images/p3.jpg", Description:null},
    ]
  }
}
