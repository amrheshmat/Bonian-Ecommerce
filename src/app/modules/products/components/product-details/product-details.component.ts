import { Component, OnInit, ɵConsole } from '@angular/core';
import { Item } from '../../models/products.model';
import { ProductService } from '../../services/products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { toTypeScript } from '@angular/compiler';
import { CartService } from 'src/app/modules/cart/services/cart.service';
import { Cart } from 'src/app/modules/cart/models/cart.model';
import { HttpHelperService } from '../../../../shared/services/http-helper.service';
import { DocumentAttributeType } from 'src/app/shared/enums/document-attribute-type';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})

export class ProductDetailsComponent implements OnInit {

  product: Item = new Item();
  attributes: any = {};
  documentAttributeType = DocumentAttributeType;
  constructor(private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private cartService: CartService,
    public httpHelperService: HttpHelperService) { }

  ngOnInit(): void {
    let productId = parseInt(this.route.snapshot.paramMap.get("id"));
    var t = this.getProductById(productId);
  }

  private getProductById(id: number) {
    this.productService.getById(id).subscribe(res => {
      this.product = res;
      this.getItemTypeById(this.product.ItemTypeId);
      this.getAllItemTypes();
    });
  }

  private getAllItemTypes() {
    this.productService.getAllItemTypes().subscribe(res => {
      return res;
    })
  }

  private getItemTypeById(itemTypeId) {
    this.productService.getItemTypeById(itemTypeId).subscribe(res => {
      return res;
    })
  }

  public onSelectProduct(event: Item) {
    this.product = event;
  }

  public addToCart(product: Item) {
    this.product.ItemAttributeValue = this.attributes;
    this.cartService.addToCart(product);
  }

}
