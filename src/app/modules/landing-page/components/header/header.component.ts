import { Component, OnInit, AfterViewInit } from '@angular/core';

import * as $ from 'jquery' ;
import { HeaderService } from '../../services/header.service';
import { Header } from '../../models/header.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit ,AfterViewInit{
  mySlideImages:Header[];
  mySlideOptions:any;
  
  constructor(private _headerService: HeaderService) { }

  ngOnInit(): void {
    this.getList();
    
    this.mySlideOptions={
      items:1,
      rtl: ($('html').css('direction') === 'rtl') ? true : false,
      margin: 10, 
      autoplay:true,
      dots: false
    } 
  }
  ngAfterViewInit():void{
    let windowHeight = $(window).height();
    $('.slick-item').height(windowHeight); 
  }

  getList(){
    this.mySlideImages = this._headerService.getAll();
  }
}
