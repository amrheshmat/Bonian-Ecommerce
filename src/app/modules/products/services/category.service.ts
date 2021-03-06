import { Injectable, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { catchError } from 'rxjs/internal/operators/catchError';
import { Category } from '../models/category.model';
import { BaseService } from '../../../shared/services/base.service';
import { CategoryFilter } from '../models/category-filter.model';

@Injectable()
export class CategoryService extends BaseService {

  controllerName: string = "ApiECommerceInventory";
  urlGetAll = "getallcategories"
  urlGetAllItemsByCategoryId = "getallitemsbycategoryid";
  urlGetAllItems = "GetAllItems";
  urlGetMaxPrice = "GetMaxPrice";
  urlGetMinPrice = "GetMinPrice";
  urlGetAllItemsByMaxPriceAndLatestDate= "GetAllItemsByMaxPriceAndLatestDate";

  // ?categoryid = 145 & start=-1 & end=0 & searchvalue=& orderby=& dir=

  getAllItemsByCategoryId(categoryFilter: CategoryFilter): any {
    return this._http.get(`${this.baseUrl}api/${this.controllerName}/${this.urlGetAllItemsByCategoryId}?categoryid=${categoryFilter.CategorId}&start=${categoryFilter.Start}&end=${categoryFilter.End}&searchvalue=&orderby=&dir=`);
  }

  getAllItems(categoryFilter: CategoryFilter): any {
    return this._http.get(`${this.baseUrl}api/${this.controllerName}/${this.urlGetAllItems}?start=${categoryFilter.Start}&end=${categoryFilter.End}&searchvalue=${categoryFilter.SearchValue}&orderby=&dir=`);
  }

  getMaxPrice(searchValue : string): any {
    return this._http.get(`${this.baseUrl}api/${this.controllerName}/${this.urlGetMaxPrice}?searchValue=${searchValue}`);
  }
  getMinPrice(searchValue : string): any {
    return this._http.get(`${this.baseUrl}api/${this.controllerName}/${this.urlGetMinPrice}?searchValue=${searchValue}`);
  }
  getAllItemsByMaxPriceAndLatestDate(categoryFilter: CategoryFilter,maxPrice:number,latestDate:Date): any {
    return this._http.get(`${this.baseUrl}api/${this.controllerName}/${this.urlGetAllItemsByMaxPriceAndLatestDate}?start=${categoryFilter.Start}&end=${categoryFilter.End}&searchvalue=${categoryFilter.SearchValue}&orderby=&dir=&maxPrice=${maxPrice}&latestDate=${latestDate}`);
  }
}