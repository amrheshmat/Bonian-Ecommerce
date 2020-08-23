import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';   
import { SpecialOffer } from '../models/special-offers.model';

@Injectable({
  providedIn: 'root'
})
export class SpecialOffersService {

  constructor() { }

  getAll(): SpecialOffer []{
    return [
        { Id:2, SpecialOfferLink:"products", SpecialOfferText:"Enjoy Our 25% On Fowl", SpecialOfferPercentage:25, SpecialOfferImage:"apples-buy-customer-95425.jpg"  } ,
        { Id:2, SpecialOfferLink:"products", SpecialOfferText:"Enjoy Our 20% On Meet", SpecialOfferPercentage:20, SpecialOfferImage:"asian-assorted-background-917371.jpg"  }, 
        { Id:2, SpecialOfferLink:"products", SpecialOfferText:"Enjoy Our 25% On Seed", SpecialOfferPercentage:30, SpecialOfferImage:"branding-buy-city-264636.jpg"  } 
    ]
  }  
}
