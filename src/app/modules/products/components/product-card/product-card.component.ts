import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Category } from '../../models/category.model';
import { CategoryService } from '../../services/category.service';
import { Item } from '../../models/Products.model';
import { ProductService } from '../../services/products.service';
import { MVCHTMLService } from 'src/app/shared/services/mvc-html.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {
  @Input() item: Item;
  @Output() selectedProduct: EventEmitter<Item> = new EventEmitter<Item>();

  constructor(private mVCHTMLService: MVCHTMLService, private router: Router) { }

  ngOnInit(): void {
    // this.getView();
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
}
