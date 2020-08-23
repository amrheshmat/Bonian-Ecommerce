import { NgModule } from '@angular/core';
import { LandingPageComponent }from './components/landing-page/landing-page.component';
import { LandingPageRoutingModule } from './landing-page-routing.module';
import { TestimonialsComponent } from './components/testimonials/testimonials.component';
import { OwlModule } from 'ngx-owl-carousel';
import { SpecialOffersComponent } from './components/special-offers/special-offers.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { TestimonialService } from './services/testimonial.service';
import { BaseService } from 'src/app/shared/services/base.service';  
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { AboutUsService } from './services/about-us.service';
import { SpecialOffersService } from './services/special-offers.service'; 
import { LandinPageHeaderComponent } from './components/landin-page-header/landin-page-header.component';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [  
    CommonModule,
    LandingPageRoutingModule,
    OwlModule,
    SlickCarouselModule
  ],
  declarations: [
    LandingPageComponent,
    TestimonialsComponent,
    SpecialOffersComponent,
    AboutUsComponent, 
  ],
  providers: [
    BaseService,
    TestimonialService,
    AboutUsService,
    SpecialOffersService,
    LandinPageHeaderComponent
  ]
})

export class LandingPageModule {
}
