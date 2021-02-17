import { Injectable } from '@angular/core';
import { BaseService } from '../../../shared/services/base.service';
import { SalesOrder } from '../models/sales-order.model';

@Injectable()
export class SalesOrderService extends BaseService {

  controllerName = "ApiECommerceSalesOrder";

  createCustomer(salesOrder: SalesOrder) {
    return this._http.post(`${this.baseUrl}Api/${this.controllerName}/AddCustomer`, salesOrder);
  }

  createSalesOrder(salesOrder: SalesOrder) {
    return this._http.post(`${this.baseUrl}Api/${this.controllerName}/AddSalesOrder`, salesOrder);
  }
  getListByProfileId(userId: number) {
    return this._http.get(`${this.baseUrl}api/${this.controllerName}/GetListByProfileId?profileId=${userId}`);

  }
}
