import { Component, OnInit, Input } from '@angular/core';
import { Category } from '../../models/category.model';
import { CategoryService } from '../../services/category.service';
import { Item } from '../../models/Products.model';
import { ProductService } from '../../services/products.service';
import { MVCHTMLService } from 'src/app/shared/services/mvc-html.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {
  @Input() item: Item;
  constructor(private mVCHTMLService: MVCHTMLService) { }

  ngOnInit(): void {
    // this.getView();
  }


  getView() {
    this.mVCHTMLService.getView().subscribe(res => {
      console.log(res);
      document.getElementById('view').innerHTML = res;
    })
  }

}
