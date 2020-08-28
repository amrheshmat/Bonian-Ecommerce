import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FullLayoutComponent } from './components/full-layout/full-layout.component';


const routes: Routes = [
  {
    path: '', component: FullLayoutComponent,
    children: [
      {
        path: '', loadChildren: () => import('../modules/home/home.module').then(m => m.HomeModule)
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
