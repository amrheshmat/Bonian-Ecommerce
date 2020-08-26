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
import { HeaderComponent } from './components/header/header.component'; 
import { HeaderService } from './services/header.service';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [  
    SharedModule,
    LandingPageRoutingModule,
    OwlModule,
    SlickCarouselModule
  ],
  declarations: [
    LandingPageComponent,
    HeaderComponent,
    AboutUsComponent,  
    TestimonialsComponent,
    SpecialOffersComponent,
  ],
  providers: [
    BaseService,
    HeaderService,
    AboutUsService,
    TestimonialService,
    SpecialOffersService,
  ]
})

export class LandingPageModule {
}
