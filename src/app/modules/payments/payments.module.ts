import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentsRoutingModule } from './payments-routing.module';
import { PaymentsComponent } from './components/payments.component';
import { PaymentStatusComponent } from './components/payment-status/payment-status.component';


@NgModule({
  declarations: [PaymentsComponent, PaymentStatusComponent],
  imports: [
    CommonModule,
    PaymentsRoutingModule
  ]
})
export class PaymentsModule { }
