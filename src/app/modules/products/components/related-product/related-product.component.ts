import { Component, OnInit, ɵConsole } from '@angular/core';
import { Item } from '../../models/products.model';
import { ProductService } from '../../services/products.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-related-product',
  templateUrl: './related-product.component.html',
  styleUrls: ['./related-product.component.scss']
})
export class RelatedProductComponent implements OnInit {

  private ParamterId: number;
  product: Item;
  public List: any = [];
  public relatedProducts: Item[];
  constructor(private _ProductService: ProductService, private route: ActivatedRoute, private router: Router) { }

  selectedProduct(product) {
    this.router.navigate(['/products', product.Id]);
    // this.ngOnInit();
  }
  ngOnInit(): void {
    this.getRelatedProducts();
    this.ParamterId = parseInt(this.route.snapshot.paramMap.get("id"));

    this.List.forEach(i => {
      if (i.Id == this.ParamterId) {
        this.product = i;
      }
    });


  }

  getRelatedProducts(): void {
    this.relatedProducts = this._ProductService.getAll();
  }

}
