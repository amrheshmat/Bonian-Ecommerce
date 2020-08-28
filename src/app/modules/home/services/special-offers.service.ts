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
      { Id:1,ImagePath: "./assets/images/apples-buy-customer-95425.jpg",Precentage:30 ,Category:"Meet"},
      { Id:2, ImagePath: "./assets/images/asian-assorted-background-917371.jpg",Precentage:25  ,Category:"Fowl"},
      { Id:3,ImagePath: "./assets/images/apples-buy-customer-95425.jpg",Precentage:10,Category:"Seed"  }, 
      { Id:4,ImagePath: "./assets/images/asian-assorted-background-917371.jpg",Precentage:25  ,Category:"Fowl"},
    ]
  }  
}
