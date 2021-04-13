import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxLoadingModule } from 'ngx-loading';
import { OrdersRoutingModule } from './orders-routing.module';
import { OrderDetailsComponent } from './components/order-details/order-details.component';
import { HomeModalComponent } from './components/home-modal/home-modal.component';
import { BsModalService } from 'ngx-bootstrap/modal';
import { MatFormFieldModule } from '@angular/material/form-field';
import { OrderInformationComponent } from './components/order-information/order-information.component';
import { CasherOrderComponent } from './components/casher-order/casher-order.component';
import { OrderPrepareComponent } from './components/order-prepare/order-prepare.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [OrderDetailsComponent,HomeModalComponent,OrderInformationComponent,CasherOrderComponent,OrderPrepareComponent],
  imports: [
    CommonModule,
    NgxLoadingModule.forRoot({}),
    OrdersRoutingModule,
    MatFormFieldModule,//😷
    FormsModule 
  ],
  providers: [
    BsModalService
  ],
})
export class OrdersModule { }
