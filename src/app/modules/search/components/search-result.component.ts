import { HostListener, Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute} from "@angular/router" ;
import { CategoryFilter } from '../../products/models/category-filter.model';
import { CategoryService } from '../../products/services/category.service';
import { Item } from '../../products/models/Products.model';
import { NgForm } from '@angular/forms';

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
endScroll2 :number =20;
startScroll :number =0;
categoryFilter: CategoryFilter = new CategoryFilter();
public loading = false;
invert = false;
max = 100;
min = 0;
step = 1;
thumbLabel = false;
value = 0;
maxPrice:number;
latestDate = null ;
formatLabel(value: number) {
  if (value >= 1000) {
    return Math.round(value / 1000) + 'k';
  }
  this.value = value;
  return value;

}

  constructor(private _categoryService: CategoryService,private router: Router,private activatedRoute: ActivatedRoute) {  
    this.endScroll = 10;
    this.startScroll = 0;
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => { 
       this.searchValue= params.get('searchValue'); 
       this.getItemBySearch(this.startScroll,this.endScroll,this.searchValue);
       this.getMinPrice(this.searchValue);
       this.getMaxPrice(this.searchValue);
  });
  
  }


  sliderOnChange(maxPrice : number,latestDate){
    if(maxPrice == null){
      maxPrice = this.maxPrice;
    }else{
      this.maxPrice = maxPrice;
    }
    if(latestDate == null){
      latestDate = this.latestDate;
    }else{
      this.latestDate = latestDate;
    }
    this.loading = true;
    this.categoryFilter.Start =0;
    this.categoryFilter.End =10;
    this._categoryService.getAllItemsByMaxPriceAndLatestDate(this.categoryFilter,maxPrice,latestDate).subscribe(res => {
      this.loading = false;
      this.itemsList = res.ItemList;
      this.totalCount = res.TotalCount; 
      this.numberOfPages = Math.ceil(res.TotalCount/10);
    });
  }
  public getItemBySearch(startScroll,endScroll,searchValue) {
    this.loading = true;
    this.categoryFilter.Start = startScroll;
    this.categoryFilter.End = endScroll;
    this.categoryFilter.SearchValue = searchValue;
    this._categoryService.getAllItems(this.categoryFilter).subscribe(res => {
      this.loading = false;
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
  public getMinPrice(searchValue){
    this._categoryService.getMinPrice(searchValue).subscribe(res =>{
      this.min = res;
    });
  }

  public getMaxPrice(searchValue){
    this._categoryService.getMaxPrice(searchValue).subscribe(res =>{
      this.max = res;
    });
  }
  
  @HostListener("window:scroll", ["$event"])
  onWindowScroll() {
  //alert(this.totalCount);
  //In chrome and some browser scroll is given to body tag
  var scrollPosition = window.pageYOffset;
  var windowSize     = window.innerHeight;
  var bodyHeight     = document.body.offsetHeight;
  var  ScrollFromBottom = Math.max(bodyHeight - (scrollPosition + windowSize), 0);
  //alert(ScrollFromBottom);
  // pos/max will give you the distance between scroll bottom and and bottom of screen in percentage.
 //if scroll position 30% from  max size ...
 //alert(ScrollFromBottom);
 var total = Math.ceil(this.totalCount / 10) * 10;
 if(ScrollFromBottom < 400){
 if(this.endScroll <= total ){
    this.endScroll += 10 ;
    this.getItemBySearch(this.startScroll,this.endScroll,this.searchValue);
   }
  
 }

 /*if( ScrollFromBottom <= 600  && ScrollFromBottom == 0){
  if(this.endScroll <11){
   this.endScroll += 10;
 
  }
}
   else if( ScrollFromBottom <= 700  && ScrollFromBottom >= 600){
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
   */
  }
  onSubmit(f: NgForm) {
    console.log(f.value.minPrice);  // { first: '', last: '' }
    console.log(f.valid);  // false
  }
}
