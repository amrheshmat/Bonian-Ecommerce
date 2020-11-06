import { Component, OnInit } from '@angular/core';
import { Customer } from '../../models/customer.model';
import { SalesOrderDetails } from '../../models/sales-order-details.model';
import { SalesOrder } from '../../models/sales-order.model';
import { CartService } from '../../services/cart.service';
import { SalesOrderService } from '../../services/sales-order.service';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.scss']
})
export class CheckOutComponent implements OnInit {

  customer: Customer = new Customer();
  constructor(private cartService: CartService, private salesOrderService: SalesOrderService) { }

  ngOnInit(): void {

  }

  public checkOut() {
    let salesOrder = this.prepareSalesOrderEntity();
    this.createSalesOrder(salesOrder);
  }

  private prepareSalesOrderEntity(): SalesOrder {//Prepare this entity to pass it to Back end
    var salesOrder: SalesOrder = new SalesOrder();
    salesOrder.salesOrderDetailsList = this.getCartItems();
    return salesOrder;
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

}
