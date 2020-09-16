import { Injectable } from '@angular/core';
import { Testimonial } from '../models/testimonial.model';
import { BaseService } from '../../../shared/services/base.service';

@Injectable({
  providedIn: 'root'
})
export class TestimonialService extends BaseService {

  entityName="Testimonial";

}
