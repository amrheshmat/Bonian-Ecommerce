import { NgModule } from '@angular/core';
import { NavbarCartComponent } from '../modules/cart/components/navbar-cart/navbar-cart.component';
import { MaterialModule } from './modules/material/material.module';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    NavbarCartComponent
  ],

  imports: [
    CommonModule,
    MaterialModule
  ],

  exports: [
    NavbarCartComponent,
    MaterialModule,
    CommonModule
  ],

  providers: [

  ]

})
export class SharedModule { }
