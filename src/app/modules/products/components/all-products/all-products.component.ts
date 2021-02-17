import { Component, OnInit } from '@angular/core';
import { Category } from '../../models/category.model';
import { CategoryService } from '../../services/category.service';
import { Item } from '../../models/Products.model';
import { ProductService } from '../../services/products.service';
import { CategoryFilter } from '../../models/category-filter.model';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.scss']
})
export class AllProductsComponent implements OnInit {
  
  itemsList: Item[];
  categoryFilter: CategoryFilter = new CategoryFilter();
  totalCount: number = 0;
  constructor(private _categoryService: CategoryService, private _itemService: ProductService) { }
  category: string;
  categoryList: Category[];
  selectedCategory: any;

  ngOnInit(): void {
    this.getCategories();
    this.getAllItems();
  }

  onTabChanged(event) {
    this.category = event.tab.textLabel;
    if (this.category == 'All') {
      this.getAllItems();
    }
    else {
      this.selectedCategory = this.categoryList[event.index - 1].Id;
      this.onCategorySelected(this.selectedCategory);
    }

  }


  getCategories(): void {
    this._categoryService.getAll().subscribe(data => {
      this.categoryList = data.InventoryCategoryList;
    })
  }
  getAllItemsByCategoryId(): void {
    this._categoryService.getAllItemsByCategoryId(this.categoryFilter).subscribe(res => {
      this.itemsList = res.ItemList;
      this.totalCount = res.TotalCount;
    });
  }

  getAllItems(): void {
    this.categoryFilter.Start = 0;
    this.categoryFilter.End = this.categoryFilter.PageSize;
    this._categoryService.getAllItems(this.categoryFilter).subscribe(res => {
      this.itemsList = res.ItemList;
      this.totalCount = res.TotalCount;
    });
  }

  onCategorySelected(categoryId: number) {
    this.categoryFilter.CategorId = categoryId;
    this.categoryFilter.Start = 0;
    this.categoryFilter.End = this.categoryFilter.PageSize;
    this.getAllItemsByCategoryId();

  }

  onScroll() {
    if (this.categoryFilter.End < this.totalCount) {
      this.categoryFilter.Start = 1;
      this.categoryFilter.End = this.categoryFilter.End + this.categoryFilter.PageSize;
      if (this.categoryFilter.CategorId) {
        this.getAllItemsByCategoryId();
      }
      else {
        this.getAllItems();
      }
    }

  }
}

