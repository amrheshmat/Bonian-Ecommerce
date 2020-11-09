import { Component, Inject, OnInit, ɵConsole } from '@angular/core';
import { Item } from '../../models/products.model';
import { ProductService } from '../../services/products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/modules/cart/services/cart.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ItemTypeAttribute } from '../../models/ItemTypeAttribute.model';
import { ItemTypeAttributeItem } from '../../models/ItemTypeAttributeItem.model';

@Component({
  selector: 'app-product-modal',
  templateUrl: './product-modal.component.html',
  styleUrls: ['./product-modal.component.scss']
})

export class ProductModalComponent implements OnInit {

  product: Item;
  constructor(private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private cartService: CartService,
    public dialogRef: MatDialogRef<ProductModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }


  close(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    // let productId = parseInt(this.route.snapshot.paramMap.get("id"));
    this.getProductById(this.data.productId);
  }

  private getProductById(id: number) {
    this.productService.getById(id).subscribe(res => {
      this.product = res;
      this.product.ItemAttributeList = this.moqDynamicAttributes();
    });
  }

  public onSelectProduct(event: Item) {
    this.product = event;
  }

  public addToCart(product: Item) {
    this.cartService.addToCart(product);
    this.close();
  }

  private moqDynamicAttributes() {
    let itemAttributeList: ItemTypeAttribute[] = [];
    let normaltext = {
      Id: 1,
      ItemTypeAttributeName: "Comment",
      ItemTypeAttributeType: 1,
      ItemTypeId: 1,
      IsActive: true,
      IsRequired: true,
      IsSearchable: false,
      ItemTypeAttributeItemList: null
    };
    itemAttributeList.push(normaltext);

    let dropDownList = {
      Id: 1,
      ItemTypeAttributeName: "Size",
      ItemTypeAttributeType: 2,
      ItemTypeId: 1,
      IsActive: true,
      IsRequired: true,
      IsSearchable: false,
      ItemTypeAttributeItemList: this.moqDropDownList()
    };
    itemAttributeList.push(dropDownList);
    return itemAttributeList;
  }

  private moqDropDownList() {
    let itemTypeAttributeItems: ItemTypeAttributeItem[] = [];
    var item1 = {
      Id: 1,
      ItemTypeAttributeItemName: "S",
      ItemTypeAttributeId: 1,
      ToolTip: "S",
      IsActive: true
    };
    itemTypeAttributeItems.push(item1);

    var item1 = {
      Id: 1,
      ItemTypeAttributeItemName: "S",
      ItemTypeAttributeId: 1,
      ToolTip: "S",
      IsActive: true
    };
    itemTypeAttributeItems.push(item1);

    var item2 = {
      Id: 2,
      ItemTypeAttributeItemName: "M",
      ItemTypeAttributeId: 1,
      ToolTip: "M",
      IsActive: true
    };
    itemTypeAttributeItems.push(item2);

    var item3 = {
      Id: 3,
      ItemTypeAttributeItemName: "L",
      ItemTypeAttributeId: 1,
      ToolTip: "L",
      IsActive: true
    };
    itemTypeAttributeItems.push(item3);

    var item4 = {
      Id: 4,
      ItemTypeAttributeItemName: "XL",
      ItemTypeAttributeId: 1,
      ToolTip: "XL",
      IsActive: true
    };
    itemTypeAttributeItems.push(item4);

    var item5 = {
      Id: 5,
      ItemTypeAttributeItemName: "XXL",
      ItemTypeAttributeId: 1,
      ToolTip: "XXL",
      IsActive: true
    };
    itemTypeAttributeItems.push(item5);

    return itemTypeAttributeItems;
  }
}