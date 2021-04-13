import { NgModule } from '@angular/core';
import { LayoutRoutingModule } from './layout-routing.module';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FullLayoutComponent } from './components/full-layout/full-layout.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { ContactUsService } from './services/contact-us.service';
import { SharedModule } from '../shared/shared.module';
import { ProductService } from '../modules/products/services/products.service';
import { AuthModule } from '../modules/authentication/auth.module';
import { RouterModule } from '@angular/router';
import { OrdersModule } from '../modules/order/orders.module';



@NgModule({
  imports: [
    SharedModule,
    LayoutRoutingModule,
    AuthModule,
    OrdersModule,
    RouterModule
  ],
  declarations: [
    FooterComponent,
    NavbarComponent,
    FullLayoutComponent,
    ContactUsComponent
  ],
  providers: [
    ContactUsService,
    ProductService
  ],
  bootstrap: [

  ]
})
export class LayoutModule { }
