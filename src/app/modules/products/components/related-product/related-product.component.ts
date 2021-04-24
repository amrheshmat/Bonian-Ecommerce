import { Component, EventEmitter, Input, OnInit, Output, ɵConsole } from '@angular/core';
import { Item } from '../../models/products.model';
import { ProductService } from '../../services/products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../../services/category.service';
import { CategoryFilter } from '../../models/category-filter.model';

@Component({
  selector: 'app-related-product',
  templateUrl: './related-product.component.html',
  styleUrls: ['./related-product.component.scss']
})
export class RelatedProductComponent implements OnInit {

  public relatedProducts: Item[];
  @Input() categoryId: number;
  categoryFilter: CategoryFilter = new CategoryFilter();
  totalCount: number;
  @Output() selectedProduct: EventEmitter<Item> = new EventEmitter<Item>();

  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.categoryFilter.CategorId = this.categoryId;
    this.categoryFilter.Start = 0;
    this.categoryFilter.End = 3;
    this.getItems();
  }

  getItems(): void {
    this.categoryService.getAllItemsByCategoryId(this.categoryFilter).subscribe(res => {
      this.relatedProducts = res.ItemList;
      this.totalCount = res.TotalCount;
    });
  }

  onScroll() {
    if (this.categoryFilter.End < this.totalCount) {
      this.categoryFilter.Start = 1;
      this.categoryFilter.End = this.categoryFilter.End + this.categoryFilter.PageSize;
      this.getItems();
    }
  }

  public selectProduct(product: Item) {
    this.selectedProduct.emit(product);
  }
}
