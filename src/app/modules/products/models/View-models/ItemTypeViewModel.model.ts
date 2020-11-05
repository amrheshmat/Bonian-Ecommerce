import { ItemType } from '../ItemType.model';
import { ItemTypeAttributeItemViewModel } from './ItemTypeAttributeItemViewModel.model';
import { ItemTypeAttributeViewModel } from './ItemTypeAttributeViewModel.model';

export class ItemTypeViewModel{
    ItemType: ItemType;

    ItemTypeAttributeTypeList : any;//  List<KeyValuePair<int, string>> 
 
    ItemTypeAttributeItemViewModel:ItemTypeAttributeItemViewModel;
    ItemTypeAttributeViewModel:ItemTypeAttributeViewModel;
}