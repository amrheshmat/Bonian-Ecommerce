import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AboutUs } from '../models/about-us.model';
import { BaseService } from '../../../shared/services/base.service';

@Injectable()
export class AboutUsService extends BaseService {

  entityName = "AboutUs";

 
}
