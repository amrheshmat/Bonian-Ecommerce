import { Customer } from './customer.model';
import { SalesOrderDetails } from './sales-order-details.model';

export class SalesOrder {
    salesOrderDetailsList: Array<SalesOrderDetails>;
    customer: Customer;
}