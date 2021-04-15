import { Component, HostListener, OnInit } from '@angular/core';
import { Category } from '../../models/category.model';
import { CategoryService } from '../../services/category.service';
import { Item } from '../../models/Products.model';
import { ProductService } from '../../services/products.service';
import { CategoryFilter } from '../../models/category-filter.model';
import { CartService } from 'src/app/modules/cart/services/cart.service';
import { Cart } from 'src/app/modules/cart/models/cart.model';
import { HttpHelperService } from 'src/app/shared/services/http-helper.service';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.scss']
})
export class AllProductsComponent implements OnInit {
  items: Cart;
  endScroll :number =10;
  endScroll2 :number =20;
  startScroll :number =0;
  itemsList: Item[];
  categoryFilter: CategoryFilter = new CategoryFilter();
  totalCount: number = 0;
  constructor( public httpHelperService:HttpHelperService,private _categoryService: CategoryService, private _itemService: ProductService,private cartService: CartService) { }
  category: string;
  categoryList: Category[];
  selectedCategory: any;
  showCart: any;
  public currentPage = 1;
  public pagination;
  public totalPage;
  public disablePrevious ;
  public disableNext ;

  ngOnInit(): void {
    this.disablePrevious = true;
    this.disableNext = false;
    this.getCategories();
    this.categoryFilter.Start = 0;
    this.categoryFilter.End = this.categoryFilter.PageSize;
    this.getAllItems();
     this.items = this.cartService.getCartFromLocalStorage();
     
    this.cartService.isCartChanged.subscribe(res => {
      if(res){
        this.items = this.cartService.getCartFromLocalStorage();
      }
    });
    this.cartService.isCartRemoved.subscribe(res=>{
      this.items = this.cartService.getCartFromLocalStorage();
    })
    
  }

  onTabChanged(event) {
    console.log(event);
    this.currentPage =1;
    this.category = event.tab.textLabel;
    if (event.index == 0) {
      this.categoryFilter.CategorId = 0;
      this.categoryFilter.Start = 0;
      this.categoryFilter.End = this.categoryFilter.PageSize;
      this.getAllItems();
    }
    else {
      this.selectedCategory = this.categoryList[event.index - 1].Id;
      this.onCategorySelected(this.selectedCategory);
    }

  }

  previouspagination(){
    this.disableNext = false;
    if(this.currentPage !=1 ){
    var pageNumber = this.currentPage - 1;
    if(pageNumber !=1){
      this.disablePrevious=false;
    }else{
      this.disablePrevious= true;
    }
    this.categoryFilter.Start = ((pageNumber -1) * 10 ) + 1;
    this.categoryFilter.End = pageNumber * 10;
    if(this.categoryFilter.CategorId == null || this.categoryFilter.CategorId ==0){
      this.getAllItems();
    }else{
     this.getAllItemsByCategoryId();
    }
    this.currentPage = this.currentPage - 1;
    }
    
  }

  nextpagination(){
    this.disablePrevious=false;
    if(this.currentPage !=this.totalPage  ){
    var pageNumber = this.currentPage + 1;
    if(pageNumber !=this.totalPage){
      this.disableNext = false;
    }else{
      this.disableNext = true;
    }
     this.categoryFilter.Start = ((pageNumber -1) * 10 ) + 1;
     this.categoryFilter.End= pageNumber * 10;
     if(this.categoryFilter.CategorId == null || this.categoryFilter.CategorId ==0){
       this.getAllItems();
     }else{
      this.getAllItemsByCategoryId();
     }
     this.currentPage = this.currentPage + 1;
    }
  }

  paginationChange(pageNumber){
    this.currentPage = pageNumber;
    if(pageNumber ==1){
      this.disablePrevious=true;
      this.disableNext =false;
    }else if(pageNumber == this.totalPage){
      this.disablePrevious=false;
      this.disableNext =true;
    }else{
      this.disablePrevious= false;
      this.disableNext =false;
    }
    this.categoryFilter.Start = ((pageNumber -1) * 10 ) + 1;
    this.categoryFilter.End = pageNumber * 10;
    if(this.categoryFilter.CategorId == null || this.categoryFilter.CategorId ==0){
      this.getAllItems();
    }else{
     this.getAllItemsByCategoryId();
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
      this.totalPage = Math.ceil(this.totalCount/10);
        this.pagination = Math.ceil(this.totalCount/10);
        this.pagination = Array(this.pagination).fill(this.pagination).map((x,i)=>i);
    });
  }

  getAllItems(): void {
    
    this._categoryService.getAllItems(this.categoryFilter).subscribe(res => {
      this.itemsList = res.ItemList;
      this.totalCount = res.TotalCount;
      this.totalPage = Math.ceil(this.totalCount/10);
        this.pagination = Math.ceil(this.totalCount/10);
        this.pagination = Array(this.pagination).fill(this.pagination).map((x,i)=>i);
    });
  }

  onCategorySelected(categoryId: number) {
    this.categoryFilter.CategorId = categoryId;
    this.categoryFilter.Start = 0;
    this.categoryFilter.End = this.categoryFilter.PageSize;
    this.getAllItemsByCategoryId();
  }

  /*onScroll() {
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

  }*/
}

