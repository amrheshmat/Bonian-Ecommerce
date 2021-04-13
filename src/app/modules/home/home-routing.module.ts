import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PaymentsComponent } from '../payments/components/payments.component';
import { SearchResultComponent} from '../search/components/search-result.component';
import { ProfileComponent } from '../authentication/components/profile/profile.component';
import { EditPersonalInfoComponent } from '../authentication/components/edit-personal-info/edit-personal-info.component';
import { EditContactInfoComponent } from '../authentication/components/edit-contact-info/edit-contact-info.component';
import { EditAccountInfoComponent } from '../authentication/components/edit-account-info/edit-account-info.component';
import { OrderDetailsComponent } from '../order/components/order-details/order-details.component';
import { OrdersComponent } from '../order/components/orders.component';
import { PaymentStatusComponent } from '../payments/components/payment-status/payment-status.component';
import { ChangePasswordComponent } from '../authentication/components/change-password/change-password.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { CasherOrderComponent } from '../order/components/casher-order/casher-order.component';
import { OrderPrepareComponent } from '../order/components/order-prepare/order-prepare.component';

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
    path: 'Ecommerce/Orders',  component: CasherOrderComponent
  },{
    path: 'Ecommerce/prepareOrder',  component: OrderPrepareComponent
  },
  {
    path: 'searchResult/:searchValue', component: SearchResultComponent
  },{
    path: 'order/order-details/:orderId/:orderStatus/:total', component: OrderDetailsComponent
  },{
    path: 'auth/profile', component: ProfileComponent
  },{
    path: 'auth/profile-EditPersonalInfo', component: EditPersonalInfoComponent
  },{
    path: 'auth/profile-EditConatctInfo', component: EditContactInfoComponent
  },{
    path: 'auth/profile-EditAccountInfo', component: EditAccountInfoComponent
  },{
    path: 'paymentStatus', component: PaymentStatusComponent
  },{
    path: 'auth/change-password', component: ChangePasswordComponent
  }
  ,
    {
      path: 'aboutUs', component: AboutUsComponent
    }
  
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
