import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Category } from '../../models/category.model';
import { CategoryService } from '../../services/category.service';
import { Item } from '../../models/Products.model';
import { ProductService } from '../../services/products.service';
import { MVCHTMLService } from 'src/app/shared/services/mvc-html.service';
import { Router } from '@angular/router';
import { CartService } from '../../../../modules/cart/services/cart.service';
import { MatDialog } from '@angular/material/dialog';
import { ProductModalComponent } from '../product-modal/product-modal.component';
import { HttpHelperService } from '../../../../shared/services/http-helper.service';
import { ItemTypeAttribute } from '../../models/ItemTypeAttribute.model';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {
  @Input() item: Item;
  @Output() selectedProduct: EventEmitter<Item> = new EventEmitter<Item>();
   itemTypeAttribute:ItemTypeAttribute;
   public itemCount:number;
  constructor(private mVCHTMLService: MVCHTMLService,
    private router: Router,
    private cartService: CartService,
    public httpHelperService:HttpHelperService,private productService: ProductService,
    public dialog: MatDialog) { }
 
  ngOnInit(): void {
    // this.getView();
  }

  public addToCart(product: Item) {
    this.cartService.addToCart(product);
  }

  getView() {
    this.mVCHTMLService.getView().subscribe(res => {
      document.getElementById('view').innerHTML = res;
    })
  }

  public selectProduct(product: Item) {
    let url = this.router.url;
    if (url.includes("product-details")) {
      this.selectedProduct.emit(product);//To Display Item from related products
      window.scroll(0, 0);//Scroll to top
    }
    else {
      this.router.navigate(['/products/product-details/' + product.Id]);
    }
  }

  openDialog(product: Item): void {
    this.productService.GetRequiredItemTypeAttribute(product.ItemTypeId).subscribe(res => {
      this.itemCount = res;
      if(this.itemCount !=null){
        const dialogRef = this.dialog.open(ProductModalComponent, {
          width: '300px',
          height: '400px',
          data: { productId: product.Id }
        });
    
        dialogRef.afterClosed().subscribe(result => {
        });
      }else{
        product.generatedId = Math.ceil( Math.random() * 100);
        this.cartService.addToCart(product);
      }
    });
  }
   
}
