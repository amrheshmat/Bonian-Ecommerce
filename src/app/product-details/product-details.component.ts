import { Component, OnInit, ɵConsole } from '@angular/core';
import { Item } from '../models/Products.model';
import { ProductsService } from '../services/products.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  private ParamterId: number;
  product: Item;
  public ProductsList: Array<Item> = [];

  constructor(private _ProductsService: ProductsService, private route: ActivatedRoute, private router: Router) { }

  selectedProduct(product) {
    debugger;
    this.router.navigate(['/products', product.Id]);
    this.ngOnInit();

  }
  ngOnInit(): void {
    debugger;
    this.ProductsList = this._ProductsService.getList();
     this.ParamterId = parseInt(this.route.snapshot.paramMap.get("id"));


    this.ProductsList.forEach(i => {
      if (i.Id == this.ParamterId) {
        this.product = i;
      }
    }); 
  }

  updateService(){ 
    this._ProductsService.updateProductsList(this.ProductsList); 
  }


}
