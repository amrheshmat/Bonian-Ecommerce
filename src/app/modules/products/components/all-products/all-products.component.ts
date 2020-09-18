import { Component, OnInit } from '@angular/core';
import { Category } from '../../models/category.model';
import { CategoryService } from '../../services/category.service';
import { Item } from '../../models/Products.model';
import { ProductService } from '../../services/products.service';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.scss']
})
export class AllProductsComponent implements OnInit {


  categoryList: Category[];
  itemsList: Item[]
  constructor(private _categoryService: CategoryService, private _itemService: ProductService) { }
  category: string;

  ngOnInit(): void {
    this.getCategories();
    this.getItems();
    this.category = this.categoryList[0].CategoryName;
  }

  onTabChanged(event) {
    this.category = event.tab.textLabel;
  }
  getCategories(): void {
    this.categoryList = this._categoryService.getAll();
  }
  getItems(): void {
    this.itemsList = this._itemService.getAll();
  }

  onCategorySelected(categoryId:number) {
    //Get Products by CatgegoryId
  }
}
