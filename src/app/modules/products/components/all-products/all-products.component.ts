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
    debugger;
    this.getItems();
  }

  onTabChanged(event) {
    this.category = event.tab.textLabel;
  }
  getCategories(): void {
    this._categoryService.getAll().subscribe(data=>{
      this.categoryList = data;
      this.category = this.categoryList[0].CategoryName;

    }) 
  }
  getItems(): void {
    this.itemsList = this._itemService.getAll();
  }

  onCategorySelected(categoryId:number) {
    //Get Products by CatgegoryId
  }
}
