import { NgModule } from '@angular/core';
import { TestimonialsComponent } from './components/testimonials/testimonials.component';
import { OwlModule } from 'ngx-owl-carousel';
import { SpecialOffersComponent } from './components/special-offers/special-offers.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { TestimonialService } from './services/testimonial.service';
import { BaseService } from 'src/app/shared/services/base.service';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { AboutUsService } from './services/about-us.service';
import { SpecialOffersService } from './services/special-offers.service';
import { HeaderComponent } from './components/header/header.component';
import { HeaderService } from './services/header.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { HomeComponent } from './components/home/home.component';
import { HomeRoutingModule } from './home-routing.module';
import { SalesOrder } from '../cart/models/sales-order.model';
import { SalesOrderService } from '../cart/services/sales-order.service';
import { BestPriceComponent } from './components/best-price/best-price.component';
import { MostOrderedComponent } from './components/most-ordered/most-ordered.component';
import { MostOrderedService } from './services/most-ordered';
import { BestPriceService } from './services/best-price';
import { RecentItemsComponent } from './components/recent-items/recent-items.component';

@NgModule({
  imports: [
    SharedModule,
    HomeRoutingModule,
    OwlModule,
    SlickCarouselModule
  ],
  declarations: [
    HomeComponent,
    HeaderComponent,
    AboutUsComponent,
    TestimonialsComponent,
    SpecialOffersComponent,
    BestPriceComponent,
    MostOrderedComponent,
    RecentItemsComponent
  ],
  providers: [
    BaseService,
    HeaderService,
    AboutUsService,
    TestimonialService,
    SpecialOffersService,
    SalesOrderService,
    MostOrderedService,
    BestPriceService,
  ]
})

export class HomeModule {
}
