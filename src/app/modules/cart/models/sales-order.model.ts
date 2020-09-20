import { Customer } from './customer.model';
import { SalesOrderDetails } from './sales-order-details.model';

export class SalesOrder {
   
    Id :number;
    Description :string; 
    InvoiceSerial :string; 
    SaasProfileId :number;
    DeliveryPrice :number;
    InvoiceDate :Date;
    Discount :number;
    Total :number;
    ProfileId :number;
    StoreId :number;
    SaleStatus:number; 
    TotalNet :number;
    CurrencyId :number;
    IsSaleInInstallments :boolean;
    ShiftId :number;
    CreationTime :Date;
    CreatedBy :number;
    ModificationTime :Date;
    ModifiedBy :number;
    IsCanceled :boolean;
    AdditionalTax :number;
    CasherId :number;  

    //#region model
    salesOrderDetailsList: Array<SalesOrderDetails>; 
    //#endregion
}