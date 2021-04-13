import { Component, OnInit, AfterViewInit } from '@angular/core';

import * as $ from 'jquery';
import { CategoryFilter } from 'src/app/modules/products/models/category-filter.model';
import { Item } from 'src/app/modules/products/models/products.model';
import { SpecialOffer } from '../../models/special-offers.model';
import { MostOrderedService } from '../../services/most-ordered';
import { SpecialOffersService } from '../../services/special-offers.service';

@Component({
  selector: 'app-most-ordered',
  templateUrl: './most-ordered.component.html',
  styleUrls: ['./most-ordered.component.scss']
})
export class MostOrderedComponent implements OnInit, AfterViewInit {
  itemsList: Item[];
  specialOffersList: SpecialOffer[];
  categoryFilter: CategoryFilter = new CategoryFilter();
  constructor(private _specialOffersService: SpecialOffersService,private mostOrderedService:MostOrderedService) { }

  ngOnInit(): void {
    // this.getAll();
    this.getMostOrdered();
  }

  ngAfterViewInit() {

  }



  getMostOrdered(){
    this.categoryFilter.Start=1;
    this.categoryFilter.End=3;
    this.mostOrderedService.getMostOrdered(this.categoryFilter).subscribe(res => {
      
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
