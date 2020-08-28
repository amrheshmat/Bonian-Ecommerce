import { Injectable } from '@angular/core';
import { Item } from '../models/Products.model'; 
import { environment } from '../../../../environments//environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  baseUrl: string = "";
  private urlGetAll = "getlist";
  private urlGetById = "GetById";
  private urlSave = "Save";
  private urlDelete = "Delete";
  private urlGetAllLite = "GetAllLite";
  private filters = "?dir=&end=10&start=0&searchvalue=&orderby=&itemTypeId=&categoryid=";
  entityName: string = "apipublicitem"
  
  ProductsList : Item[];
   constructor() {
      this.baseUrl = environment.apiUrl; 
    }  
    
    getAll(): Item[]{
      return [
        {Id:1,ItemName:"ItemName A",ForSale:null,DefaultPurchaseDiscount:312,
        ItemTypeId : 1, TaxId:2,ItemCode:123 ,ItemDescription:"desc" , ItemPurchasePrice:4660, ItemUnit:"123",
        DiscountForSale:123,MaxDiscount:441 ,ItemPrice:234 ,DemandLimit:14 ,DemandLimitForInventory:15 ,
        ExpirationDate:null ,BrandId:223 ,CategoryId:6 ,SellByUnit:false ,UnitNumber:12 ,UnitPrice:150 ,CurrentAveragePrice:222,
        BarCode:null ,ProductionOutPutMinutes:null ,ValidityDuration:null,ImagePath:"cl-6.jpg"},

        {Id:2,ItemName:"ItemName B",ForSale:null,DefaultPurchaseDiscount:312,
        ItemTypeId : 1, TaxId:2,ItemCode:123 ,ItemDescription:"desc" , ItemPurchasePrice:2883, ItemUnit:"123",
        DiscountForSale:123,MaxDiscount:441 ,ItemPrice:566,DemandLimit:14 ,DemandLimitForInventory:15 ,
        ExpirationDate:null ,BrandId:223 ,CategoryId:2 ,SellByUnit:false ,UnitNumber:12 ,UnitPrice:984 ,CurrentAveragePrice:222,
        BarCode:null ,ProductionOutPutMinutes:null ,ValidityDuration:null,ImagePath:"cl-5.jpg"},

        {Id:4,ItemName:"ItemName C",ForSale:null,DefaultPurchaseDiscount:312,
        ItemTypeId : 1, TaxId:581,ItemCode:123 ,ItemDescription:"desc" , ItemPurchasePrice:174, ItemUnit:"123",
        DiscountForSale:123,MaxDiscount:441 ,ItemPrice:956 ,DemandLimit:14 ,DemandLimitForInventory:15 ,
        ExpirationDate:null ,BrandId:223 ,CategoryId:1 ,SellByUnit:false ,UnitNumber:12 ,UnitPrice:245 ,CurrentAveragePrice:222,
        BarCode:null ,ProductionOutPutMinutes:null ,ValidityDuration:null,ImagePath:"cl-4.jpg"},

        {Id:4,ItemName:"ItemName D",ForSale:null,DefaultPurchaseDiscount:312,
        ItemTypeId : 1, TaxId:581,ItemCode:123 ,ItemDescription:"desc" , ItemPurchasePrice:174, ItemUnit:"123",
        DiscountForSale:123,MaxDiscount:441 ,ItemPrice:956 ,DemandLimit:14 ,DemandLimitForInventory:15 ,
        ExpirationDate:null ,BrandId:223 ,CategoryId:1 ,SellByUnit:false ,UnitNumber:12 ,UnitPrice:314 ,CurrentAveragePrice:222,
        BarCode:null ,ProductionOutPutMinutes:null ,ValidityDuration:null,ImagePath:"cl-3.jpg"},

        {Id:4,ItemName:"ItemName D",ForSale:null,DefaultPurchaseDiscount:312,
        ItemTypeId : 1, TaxId:581,ItemCode:123 ,ItemDescription:"desc" , ItemPurchasePrice:174, ItemUnit:"123",
        DiscountForSale:123,MaxDiscount:441 ,ItemPrice:956 ,DemandLimit:14 ,DemandLimitForInventory:15 ,
        ExpirationDate:null ,BrandId:223 ,CategoryId:1 ,SellByUnit:false ,UnitNumber:12 ,UnitPrice:314 ,CurrentAveragePrice:222,
        BarCode:null ,ProductionOutPutMinutes:null ,ValidityDuration:null,ImagePath:"cl-3.jpg"},

        {Id:4,ItemName:"ItemName D",ForSale:null,DefaultPurchaseDiscount:312,
        ItemTypeId : 1, TaxId:581,ItemCode:123 ,ItemDescription:"desc" , ItemPurchasePrice:174, ItemUnit:"123",
        DiscountForSale:123,MaxDiscount:441 ,ItemPrice:956 ,DemandLimit:14 ,DemandLimitForInventory:15 ,
        ExpirationDate:null ,BrandId:223 ,CategoryId:1 ,SellByUnit:false ,UnitNumber:12 ,UnitPrice:314 ,CurrentAveragePrice:222,
        BarCode:null ,ProductionOutPutMinutes:null ,ValidityDuration:null,ImagePath:"cl-3.jpg"},
        
        {Id:4,ItemName:"ItemName D",ForSale:null,DefaultPurchaseDiscount:312,
        ItemTypeId : 1, TaxId:581,ItemCode:123 ,ItemDescription:"desc" , ItemPurchasePrice:174, ItemUnit:"123",
        DiscountForSale:123,MaxDiscount:441 ,ItemPrice:956 ,DemandLimit:14 ,DemandLimitForInventory:15 ,
        ExpirationDate:null ,BrandId:223 ,CategoryId:1 ,SellByUnit:false ,UnitNumber:12 ,UnitPrice:314 ,CurrentAveragePrice:222,
        BarCode:null ,ProductionOutPutMinutes:null ,ValidityDuration:null,ImagePath:"cl-3.jpg"},
      ]
  }
}