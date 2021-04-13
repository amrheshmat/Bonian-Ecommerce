import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Header } from '../models/header.model';
import { BaseService } from '../../../shared/services/base.service';
import { CategoryFilter } from '../../products/models/category-filter.model';

@Injectable()
export class MostOrderedService extends BaseService {

  controllerName = "ApiECommerceInventory";//Controller Name
  urlGetMostOrdered = "GetMostOrdered";


  getMostOrdered(categoryFilter: CategoryFilter): any {
    return this._http.get(`${this.baseUrl}api/${this.controllerName}/${this.urlGetMostOrdered}?categoryid=${categoryFilter.CategorId}&start=${categoryFilter.Start}&end=${categoryFilter.End}&searchvalue=&orderby=&dir=`);
  }

}
