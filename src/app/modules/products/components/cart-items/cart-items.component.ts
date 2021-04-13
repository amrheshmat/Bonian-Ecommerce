import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/modules/cart/services/cart.service';
import { Item } from 'src/app/modules/products/models/products.model';
import { DocumentAttributeType } from 'src/app/shared/enums/document-attribute-type';
import { HttpHelperService } from 'src/app/shared/services/http-helper.service';

@Component({
  selector: 'app-cart-items',
  templateUrl: './cart-items.component.html',
  styleUrls: ['./cart-items.component.scss']
})
export class CartItemsComponent implements OnInit {
  product: Item = new Item();
  attributes: any = {};
  items: Array<Item>;
  values:any ={};
  keys :any ={};
  keyValues :any ={};
  len :any ={};
 mapped:any =[];
  documentAttributeType = DocumentAttributeType;
  constructor(private cartSevice: CartService, public httpHelperService:HttpHelperService) { }

  ngOnInit(): void {
    this.items = this.cartSevice.getCartFromLocalStorage().items;
    this.cartSevice.isCartChanged.subscribe(res => {
      if (res) {
        this.items = this.cartSevice.getCartFromLocalStorage().items;
      }
    });
  }

  public removeItem(item: Item) {
    this.cartSevice.removeFromCart(item);
    this.items = this.cartSevice.getCartFromLocalStorage().items;
  }
  public increaseQuantity(item: Item) {
    item.Quantity++;
    this.cartSevice.updateItemInCart(item);
  }

  public decreaseQuantity(item: Item) {
    if (item.Quantity > 1) {
      item.Quantity--;
      this.cartSevice.updateItemInCart(item);
    }
  }
  public getItemTypeAttributeValue(itemAttributeValue :any,itemAttributeList:any){
    this.mapped = Object.keys(itemAttributeValue).map(key => ({type: key, value: itemAttributeValue[key]}));
   /*let item = this.items.find(x=> x.generatedId == generatedId);
    if(item){
      if(item.ItemAttributeValue != null){
        
         this.keys = Object.keys(item.ItemAttributeValue);
         this.values = Object.values(item.ItemAttributeValue);
         this.len = this.keys.length;
        for (let i = 0; i < this.len; i++){
          alert(this.keys[i]);
          var isRequired = item.ItemAttributeList.find(x=> x.IsRequired ==true && x.Id == this.keys[i]);
          if(isRequired != null){
              this.keyValues[isRequired.ItemTypeAttributeName] = this.values[i];
          }
         
      }
      this.mapped = Object.keys(this.keyValues).map(key => ({type: key, value: this.keyValues[key]}));
    }
    
  }*/
}
}
