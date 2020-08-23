import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { LandingPageComponent } from './landing-page/landing-page.component'; 
// import { ProductDetailsComponent } from './product-details/product-details.component';
// import { ViewCartComponent } from './view-cart/view-cart.component';
// import { CheckOutComponent } from './forms/check-out/check-out.component';
// import { SignInComponent } from './forms/sign-in/sign-in.component';
// import { AllProductsComponent } from './all-products/all-products.component';


const routes: Routes = [
  { path: '', loadChildren: () => import('./layout/layout.module').then(m => m.LayoutModule) }

  // { path: '', component: LandingPageComponent },
  // { path: 'products', component: AllProductsComponent },
  // { path: 'products/:id', component: ProductDetailsComponent },
  // { path: 'viewcart', component: ViewCartComponent },
  // { path: 'checkout', component: CheckOutComponent },
  // { path: 'signin', component: SignInComponent },
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
