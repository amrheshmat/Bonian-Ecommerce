import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JwtModule } from "@auth0/angular-jwt";
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { SearchResultComponent } from './modules/search/components/search-result.component';
import { CategoryService } from './modules/products/services/category.service';
import { Payments } from './modules/cart/models/payments.model';
import { FormsModule } from '@angular/forms';
import { OrdersComponent } from './modules/order/components/orders.component';
import { NgxLoadingModule } from 'ngx-loading';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  declarations: [
    AppComponent,
    SearchResultComponent,
    OrdersComponent
  ],
  imports: [
    BrowserModule,
    NgxLoadingModule.forRoot({}),
    FormsModule,
    BrowserAnimationsModule,
    SharedModule,
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    HttpClientModule,
    MatFormFieldModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter
      }
    }),
    
  ],
  providers: [
    CategoryService,
    Payments
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function tokenGetter() {
  return localStorage.getItem("jwt");
}
