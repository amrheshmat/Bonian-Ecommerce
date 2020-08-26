import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FullLayoutComponent } from './components/full-layout/full-layout.component';
import { AllProductsComponent } from '../modules/products/components/all-products/all-products.component';


const routes: Routes = [
  {
    path: '', component: FullLayoutComponent,
    children: [
      {
        path: '', loadChildren: () => import('../modules/landing-page/landing-page.module').then(m => m.LandingPageModule)
      },
      {
        path: 'products', loadChildren: () => import('../modules/products/products.module').then(m => m.ProductsModule)
      },
      {
        path: 'cart', loadChildren: () => import('../modules/cart/cart.module').then(m => m.CartModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
