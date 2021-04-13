import { Component, OnInit, AfterViewInit } from '@angular/core';

import * as $ from 'jquery';
import { CategoryFilter } from 'src/app/modules/products/models/category-filter.model';
import { Item } from 'src/app/modules/products/models/products.model';
import { SpecialOffer } from '../../models/special-offers.model';
import { BestPriceService } from '../../services/best-price';
import { SpecialOffersService } from '../../services/special-offers.service';

@Component({
  selector: 'app-best-price',
  templateUrl: './best-price.component.html',
  styleUrls: ['./best-price.component.scss']
})
export class BestPriceComponent implements OnInit, AfterViewInit {
  itemsList: Item[];
  specialOffersList: SpecialOffer[];
  categoryFilter: CategoryFilter = new CategoryFilter();
  constructor(private _specialOffersService: SpecialOffersService,private bestPrice:BestPriceService) { }

  ngOnInit(): void {
    // this.getAll();
    this.getBestPrice();
  }

  ngAfterViewInit() {

  }

 

  getBestPrice(){
    this.categoryFilter.Start=1;
    this.categoryFilter.End=3;
    this.categoryFilter.Orderby ="ItemPrice";
    this.categoryFilter.Dir = "ASC";
    this.bestPrice.getBestPrice(this.categoryFilter).subscribe(res => {
      
      for(let i of Object.keys(res)){
        if(i == 'ItemList'){
          this.itemsList = res[i];
        }
      }
      
    });
  }
  slideConfig = {
    "rtl": ($('html').css('direction') === 'rtl') ? true : false,
    "slidesToShow": 3,
    "slidesToScroll": 1,
    "autoplay": true,
    "arrows": true,
    "infinite": true,
    "responsive": [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };



  slickInit(e) {
    console.log('slick initialized');
  }

  breakpoint(e) {
    console.log('breakpoint');
  }

  afterChange(e) {
    console.log('afterChange');
  }

  beforeChange(e) {
    console.log('beforeChange');
  }


}
