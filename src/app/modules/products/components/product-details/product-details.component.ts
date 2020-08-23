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

  private ParamterId: number;
  product: Item;
  public List: any = [];
  public ProductsList : Item[];
  constructor(private _ProductService: ProductService, private route: ActivatedRoute, private router: Router) { }

  selectedProduct(product) {
    this.router.navigate(['/products', product.Id]);
    this.ngOnInit();
  }
  ngOnInit(): void { 
     this.ParamterId = parseInt(this.route.snapshot.paramMap.get("id"));
 
      this.List.forEach(i => {
        if (i.Id == this.ParamterId) {
          this.product = i;
        }
      }); 

       
  }
 

}
