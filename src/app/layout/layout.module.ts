import { NgModule } from '@angular/core';
import { LayoutRoutingModule } from './layout-routing.module';

import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FullLayoutComponent } from './components/full-layout/full-layout.component';
import { CommonModule } from '@angular/common';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { ContactUsService } from './services/contact-us.service';
 


@NgModule({ 
  imports: [  
    CommonModule,
    LayoutRoutingModule
  ],
  declarations: [
    FooterComponent,
    NavbarComponent,
    FullLayoutComponent,
    ContactUsComponent
  ],
  providers: [
    ContactUsService
  ],
  bootstrap: [
    
  ]
})
export class LayoutModule { }
