import { Injectable } from '@angular/core';
import { BaseService } from '../../../shared/services/base.service';

@Injectable()
export class ProductService extends BaseService {
  controllerName = "apiinventory";
  urlGetById = "getitembyid";

  getById(id: number): any {
    return this._http.get(`${this.baseUrl}api/${this.controllerName}/${this.urlGetById}?itemId=${id}`);
  }
}