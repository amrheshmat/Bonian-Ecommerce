import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Header } from '../models/header.model';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  constructor() { }

  getAll(): Header[] {
    return [
        {Id:1,ImagePath:"images/slider1.jpg"},
        {Id:2,ImagePath:"images/slider2.jpg"},
        {Id:3,ImagePath:"images/slider3.jpg"}
    ]
  }
}
