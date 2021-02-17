import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FullLayoutComponent } from './components/full-layout/full-layout.component';
import { EditAccountInfoComponent} from '../modules/profile/components/edit-account-info/edit-account-info.component';
import { EditPersonalInfoComponent} from '../modules/profile/components/edit-personal-info/edit-personal-info.component';
import { EditContactInfoComponent} from '../modules/profile/components/edit-contact-info/edit-contact-info.component';


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
      },
      {
        path: 'orders', loadChildren: () => import('../modules/orders/orders.module').then(m => m.OrdersModule)
      },
      {
        path: 'payments', loadChildren: () => import('../modules/payments/payments.module').then(m => m.PaymentsModule)
      },
      {
        path: 'searchResult/:searchValue', loadChildren: () => import('../modules/payments/payments.module').then(m => m.PaymentsModule)
      },
      {
        path: 'profile', loadChildren: () => import('../modules/profile/profile.module').then(m => m.ProfileModule)
      },
      {
        path: 'editAccountInfo', component :  EditAccountInfoComponent
      }
      ,
      {
        path: 'editPersonalInfo', component :  EditPersonalInfoComponent
      }
      ,
      {
        path: 'editContactInfo', component :  EditContactInfoComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
