import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { ProductsComponent } from './Products/Products.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ViewCartComponent } from './view-cart/view-cart.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { SignInComponent } from './sign-in/sign-in.component';


const routes: Routes = [
  {path: '', component: LandingPageComponent},
  {path: 'products', component: ProductsComponent},
  {path: 'products/:id', component: ProductDetailsComponent},
  {path: 'viewcart', component: ViewCartComponent},
  {path: 'checkout', component: CheckOutComponent},
  {path: 'signin', component: SignInComponent},
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
