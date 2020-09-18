import { Injectable } from '@angular/core';
import { ContactUsData } from '../models/contact-us-data.model';
import { BaseService } from '../../shared/services/base.service';

@Injectable()
export class ContactUsService extends BaseService {
  controllerName = "ContactUs";

}
