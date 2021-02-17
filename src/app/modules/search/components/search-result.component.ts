import { HostListener, Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute} from "@angular/router" ;
import { CategoryFilter } from '../../products/models/category-filter.model';
import { CategoryService } from '../../products/services/category.service';
import { Item } from '../../products/models/Products.model';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit {
public searchValue;
public searchresult;
public categoryIdOfRelatedProduct;
Arr = Array;
scroll:any;
numberOfPages:number = 0;
itemsList: Item[];
relatedProduct: Item[];
totalCount: number = 0;
endScroll :number =10;
startScroll :number =0;
categoryFilter: CategoryFilter = new CategoryFilter();
  constructor(private _categoryService: CategoryService,private router: Router,private activatedRoute: ActivatedRoute) {  
    
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => { 
       this.searchValue= params.get('searchValue'); 
  });
  this.getItemBySearch(this.startScroll,this.endScroll,this.searchValue);
  }

  @HostListener("window:scroll", ["$event"])
  onWindowScroll() {
  //In chrome and some browser scroll is given to body tag
  var scrollPosition = window.pageYOffset;
  var windowSize     = window.innerHeight;
  var bodyHeight     = document.body.offsetHeight;
  var  ScrollFromBottom = Math.max(bodyHeight - (scrollPosition + windowSize), 0);

  // pos/max will give you the distance between scroll bottom and and bottom of screen in percentage.
 //if scroll position 30% from  max size ...
   if( ScrollFromBottom <= 700  && ScrollFromBottom >= 600){
     if(this.endScroll <20){
      this.endScroll = 20;
    this.getItemBySearch(this.startScroll,this.endScroll,this.searchValue);
     }
    
   }else if( ScrollFromBottom <= 600  && ScrollFromBottom >= 500){
    if(this.endScroll <30){
      this.endScroll = 30;
    this.getItemBySearch(this.startScroll,this.endScroll,this.searchValue);
     }
    }
     else if( ScrollFromBottom <= 500  && ScrollFromBottom >= 400){
      if(this.endScroll <40){
        this.endScroll = 40;
      this.getItemBySearch(this.startScroll,this.endScroll,this.searchValue);
       }
   }
   
  }
  
  public getItemBySearch(startScroll,endScroll,searchValue) {
    this.categoryFilter.Start = startScroll;
    this.categoryFilter.End = endScroll;
    this.categoryFilter.SearchValue = searchValue;
    this._categoryService.getAllItems(this.categoryFilter).subscribe(res => {
      this.itemsList = res.ItemList;
      this.totalCount = res.TotalCount; 
      this.numberOfPages = Math.ceil(res.TotalCount/10);
      for(let i of this.itemsList){
        this.categoryIdOfRelatedProduct = i.CategoryId;
      }

      this.categoryFilter.Start = 0;
      this.categoryFilter.End = 3;
      this.categoryFilter.CategorId = this.categoryIdOfRelatedProduct;
      this._categoryService.getAllItemsByCategoryId(this.categoryFilter).subscribe(res=>{
        this.relatedProduct = res.ItemList;
      });
    });
  }
  
  
}
