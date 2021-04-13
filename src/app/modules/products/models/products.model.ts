import { ItemTypeAttribute } from './ItemTypeAttribute.model';
import { ItemTypeAttributeValue } from './ItemTypeAttributeValue.model';

export class Item {
  generatedId: number; // to distinct item with same id and different attribute ...
  Id: number;
  ItemName: string;
  CategoryName: string;
  ForSale: boolean;
  DefaultPurchaseDiscount: number;
  ItemTypeId: number;
  TaxId: number;
  ItemCode: number;
  ItemDescription: string;
  ItemPurchasePrice: number;
  ItemUnit: string;
  DiscountForSale: number;
  MaxDiscount: number;
  ItemPrice: number;
  DemandLimit: number;
  DemandLimitForInventory: number;
  ExpirationDate: Date;
  BrandId: number;
  CategoryId: number;
  SellByUnit: boolean;
  UnitNumber: number;
  UnitPrice: number;
  CurrentAveragePrice: number;
  BarCode: number;
  ProductionOutPutMinutes: number;
  ValidityDuration: number;
  ImagePath: string;
  Quantity: number;
  ItemAttributeList: ItemTypeAttribute[];
  ItemAttributeValue: ItemTypeAttributeValue[];
  ItemAttributeValueList :  ItemTypeAttributeValue[];
  // IsActive :boolean;
  // CreationTime : Date;
  // CreatedBy:number;
  // ModificationTime : Date;
  // ModifiedBy :number;
  // SaasProfileId :number;
}
