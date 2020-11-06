import { ItemTypeAttributeItem } from './ItemTypeAttributeItem.model';

 
export class ItemTypeAttribute{
    Id:Number;
    ItemTypeAttributeName:string;
    ItemTypeAttributeType:number;
    ItemTypeId:Number;
    IsActive:boolean;
    IsRequired:boolean;
    IsSearchable:boolean;
    ItemTypeAttributeItemList: ItemTypeAttributeItem[];

}