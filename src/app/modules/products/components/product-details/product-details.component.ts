import { Component, OnInit, ɵConsole } from '@angular/core';
import { Item } from '../../models/products.model';
import { ProductService } from '../../services/products.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  product: Item = new Item();
  constructor(private _productService: ProductService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    let productId = parseInt(this.route.snapshot.paramMap.get("id"));
    this.getProductById(productId);
  }

  private getProductById(id: number) {
    this._productService.getById(id).subscribe(res => {
      this.product = res;
    });
  }

  public onSelectProduct(event: Item) {
    this.product = event;
  }
}
