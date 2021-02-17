import { Component, OnInit } from '@angular/core';
import { UserProfileModel } from '../../../authentication/models/user-profile.model';
import { AuthService } from '../../../authentication/services/auth.service';
import { Customer } from '../../models/customer.model';
import { SalesOrderDetails } from '../../models/sales-order-details.model';
import { SalesOrder } from '../../models/sales-order.model';
import { CartService } from '../../services/cart.service';
import { SalesOrderService } from '../../services/sales-order.service';
import {Router} from "@angular/router"

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.scss']
})
export class CheckOutComponent implements OnInit {

  public userProfileModel: UserProfileModel;
  //userProfileModel: UserProfileModel = new UserProfileModel();
  countryList: any = [];
  areaList: any = [];
  cityList: any = [];
  districtList: any = [];
  constructor(private authService: AuthService,
    private cartService: CartService,private router: Router,
    private salesOrderService: SalesOrderService) { }

  ngOnInit(): void {
    this.getUserName();
    this.getRegistrationLookUp();//Country => Area => City => District
   console.log(this.userProfileModel);
  }

  getRegistrationLookUp() {
    this.authService.getRegistrationLookUp().subscribe(res => {
      this.prepareLoockups(res);
    });
    console.log(this.authService.getRegistrationLookUp());
  }

  prepareLoockups(res) {
    this.countryList = res['CountryIndexViewModel'].CountryList;
    this.areaList = res['AreaIndexViewModel'].AreaList;
    this.cityList = res['CityIndexViewModel'].CityList;
    this.districtList = res['DistrictIndexViewModel'].DistrictList;
  }

  public checkOut() {
      let salesOrder = this.prepareSalesOrderEntity();
      var userProfile = this.authService.getUserProfileFromLocalStorage();
      salesOrder.ProfileId = userProfile.ProfileID;

      this.createSalesOrder(salesOrder);
      this.router.navigate(['/payments'])
   
  }

  public purchaseLater() {
    if(this.userProfileModel.Username){
      let salesOrder = this.prepareSalesOrderEntity();
      this.createSalesOrder(salesOrder);
      this.router.navigate(['/orders'])
    }else{
      let salesOrder = this.prepareSalesOrderEntity();
      this.createSalesOrder(salesOrder);
      this.router.navigate(['/auth/login'])
    }
    
  }
  private prepareSalesOrderEntity(): SalesOrder {//Prepare this entity to pass it to Back end
    var salesOrder: SalesOrder = new SalesOrder();
    salesOrder.salesOrderDetailsList = this.getCartItems();
    return salesOrder;
  }

  private register() {
    this.authService.register(this.userProfileModel).subscribe(res => {
      console.log(res);
    })
  }

  private createSalesOrder(salesOrder: SalesOrder) { 
    this.salesOrderService.createSalesOrder(salesOrder).subscribe(res => {
      console.log(res);
    })
  }

  private getCartItems(): Array<SalesOrderDetails> {
    var salesOrderDetailsList: Array<SalesOrderDetails> = [];
    var cart = this.cartService.getCartFromLocalStorage();
    if (cart) {
      for (let item of cart.items) {
        let salesOrderDetails: SalesOrderDetails = new SalesOrderDetails();
        salesOrderDetails.ItemId = item.Id;
        salesOrderDetails.Quantity = item.Quantity;
        salesOrderDetails.Price = item.ItemPrice;
        salesOrderDetailsList.push(salesOrderDetails);
      }
    }
    return salesOrderDetailsList;
  }
  private getUserName() {
    this.userProfileModel = this.authService.getUserProfileFromLocalStorage();
  }

}
