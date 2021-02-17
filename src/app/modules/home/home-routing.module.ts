import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PaymentsComponent } from '../payments/components/payments.component';
import { OrdersComponent} from '../orders/components/orders.component';
import { SearchResultComponent} from '../search/components/search-result.component';
import { ProfileComponent} from '../profile/components/profile.component';
import { EditAccountInfoComponent} from '../profile/components/edit-account-info/edit-account-info.component';
import { EditPersonalInfoComponent} from '../profile/components/edit-personal-info/edit-personal-info.component';
import { EditContactInfoComponent} from '../profile/components/edit-contact-info/edit-contact-info.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'products', loadChildren: () => import('./../products/products.module').then(m => m.ProductsModule)
  },
  {
    path: 'payments', component: PaymentsComponent
  },{
    path: 'orders', component: OrdersComponent
  },
  {
    path: 'searchResult/:searchValue', component: SearchResultComponent
  },
  {
    path: 'profile', component : ProfileComponent 
  },
  {
    path: 'editAccountInfo', component : EditAccountInfoComponent 
  },
  {
    path: 'editPersonalInfo', component : EditPersonalInfoComponent 
  },
  {
    path: 'editContactInfo', component : EditContactInfoComponent 
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
    // RouterModule.forRoot(routes, {
    //   anchorScrolling: 'enabled',
    // }),
  ],
  exports: [RouterModule]
})
export class HomeRoutingModule {
}
