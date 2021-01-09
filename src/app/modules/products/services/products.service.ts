import { Injectable } from '@angular/core';
import { BaseService } from '../../../shared/services/base.service';

@Injectable()
export class ProductService extends BaseService {
  controllerName = "ApiECommerceInventory";
  urlGetById = "getitembyid";
  urlGetAllItemTypes = "GetAllItemTypes";
  urlGetitemtypebyid = "getitemtypebyid";
  getById(id: number): any {
    return this._http.get(`${this.baseUrl}api/${this.controllerName}/${this.urlGetById}?itemId=${id}`);
  }

  getAllItemTypes(): any {
    return this._http.get(`${this.baseUrl}api/${this.controllerName}/${this.urlGetAllItemTypes}?Start=-1&End=0&searchValue=&orderby=&dir=`);
  }

  getItemTypeById(itemTypeId: number): any {
    return this._http.get(`${this.baseUrl}api/${this.controllerName}/${this.urlGetitemtypebyid}?id=${itemTypeId}`);
  }

}