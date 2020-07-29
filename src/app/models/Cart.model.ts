import { Items } from './Products.model';

export class Cart{  
    Item:Items;
    
    Id :number;
    Price :number;
    Discount:number;
    Quantity :number;
    SalesOrderId:number;
    TaxId:number;
    ItemId:number;
    CostCenterId:number;
    ItemTypeId:number;
    PriceCost :number;
    Description :string;
    SoldItemPriceCost:number;
    TaxValue :number;
    DiscountValue :number;
}