import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { OwlModule } from 'ngx-owl-carousel';

import { LayoutRoutingModule } from './layout-routing.module';

import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FullLayoutComponent } from './components/full-layout/full-layout.component';
import { CommonModule } from '@angular/common';
 


@NgModule({ 
  imports: [  
    CommonModule,
    LayoutRoutingModule
  ],
  declarations: [
    FooterComponent,
    NavbarComponent,
    FullLayoutComponent
  ],
  providers: [
     
  ],
  bootstrap: [
    
  ]
})
export class LayoutModule { }
