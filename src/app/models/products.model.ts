
  export class Item{
    Id:number;
    ProductName:string;
    Category:string;
    ProductDescription:string;
    Weight:number;
    Quantity:number;
    Price:number;
    ImagePath:string;
  } 

  export class Items{
    Id :number;
    ItemName :string;
    ForSale :boolean;
    DefaultPurchaseDiscount  :number;
    SaasProfileId  :number;
    ItemTypeId  :number;
    TaxId  :number;
 
    ItemCode :number;
    ItemDescription :string;
    ItemPurchasePrice:number;
    ItemUnit :string;
    DiscountForSale :number; 
    MaxDiscount :number;
    ItemPrice :number;
    DemandLimit :number;
    DemandLimitForInventory :number;
    ExpirationDate :Date;
    BrandId :number;
    CategoryId :number; 
    SellByUnit :boolean;
    UnitNumber :number;
    UnitPrice :number; 
    IsActive :boolean;
    CurrentAveragePrice :number;
    BarCode :number;
    CreationTime : Date;
    CreatedBy :number;
    ModificationTime : Date;
    ModifiedBy :number;
    ProductionOutPutMinutes :number;
    ValidityDuration :number;
  }
