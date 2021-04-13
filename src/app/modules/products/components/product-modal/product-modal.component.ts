import { Component, Inject, OnInit, ɵConsole } from '@angular/core';
import { Item } from '../../models/products.model';
import { ProductService } from '../../services/products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/modules/cart/services/cart.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ItemTypeAttribute } from '../../models/ItemTypeAttribute.model';
import { ItemTypeAttributeItem } from '../../models/ItemTypeAttributeItem.model';
import { DocumentAttributeType } from '../../../../shared/enums/document-attribute-type';
import { randomBytes } from 'crypto';
import { SalesOrderService } from 'src/app/modules/cart/services/sales-order.service';
import { OrdersComponent } from 'src/app/modules/order/components/orders.component';
import { UserProfileModel } from 'src/app/modules/authentication/models/user-profile.model';
import { AuthService } from 'src/app/modules/authentication/services/auth.service';
import { SalesOrder } from 'src/app/modules/cart/models/sales-order.model';
import {Location} from '@angular/common';

@Component({
  selector: 'app-product-modal',
  templateUrl: './product-modal.component.html',
  styleUrls: ['./product-modal.component.scss']
})

export class ProductModalComponent implements OnInit {
  public orderDetailsAttributeValue ;
  product: Item;
  public Message;
  public orderDetails ;
  public orderId;
  public price;
  public orderDetailsId ;
  public orderStatus;
  salesOrder : any = [];
  public loading = false;
  getMyOrders:any;
  userProfileModel: UserProfileModel;
  attributes: any = {};
  documentAttributeType = DocumentAttributeType;
  constructor(private _location: Location,private router: Router,private salesOrderService:SalesOrderService,private productService: ProductService,private authService:AuthService,
    private route: ActivatedRoute,
    private cartService: CartService,
    public dialogRef: MatDialogRef<ProductModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }


  close(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.userProfileModel = this.authService.getUserProfileFromLocalStorage();
    if(this.data){
      this.Message = this.data.message;
      this.orderDetailsId = this.data.orderDetailsId;
      this.orderId = this.data.orderId;
      this.price = this.data.price;
      if(this.data.productId){
        this.getProductById(this.data.productId);
      }
      
    }

    this.route.paramMap.subscribe(params => { 
      this.getOrdersByProfileId(null,null);
   });
      
  }

  private getProductById(id: number) {
    this.productService.getById(id).subscribe(res => {
      this.product = res;
      this.getItemTypeById(this.product.ItemTypeId);
    });
  }

  private getItemTypeById(itemTypeId: number) {
    itemTypeId = this.product.ItemTypeId;
    this.productService.getItemTypeById(itemTypeId).subscribe(res => {
      this.product.ItemAttributeList = res.ItemType.ItemTypeAttributeList;
    });
  }

  public onSelectProduct(event: Item) {
    this.product = event;
  }

  public addToCart(product: Item) {
    this.product.ItemAttributeValue = this.attributes;
    this.product.generatedId = Math.ceil( Math.random() * 100);
    this.cartService.addToCart(product);
    this.close();
  }
 getOrdersByProfileId(salesStatus,tableNumber){
    this.loading = true;
    if(this.userProfileModel.ProfileTypeId == 10){
      this.salesOrderService.getOrderByProfileId(salesStatus,tableNumber,0,10).subscribe(response => {
        this.getMyOrders = response;
        this.loading = false;
        });
    }else{
      this.salesOrderService.getAllOrders(salesStatus,tableNumber,0,10).subscribe(res=>{
        this.getMyOrders = res;
        this.loading = false;
      });
    }
  
 }
  CancelOrder(orderId,orderStatus,salesStatus,tableNumber){
    this.salesOrderService.getOrderById(salesStatus,tableNumber,orderId).subscribe(res=>{
      let keys = Object.keys(res);
        let values = Object.values(res);
         let len = keys.length;
           for (let i = 0; i < len; i++){
             if(values[i].SaleStatus == 6){ 
              this.salesOrderService.updateOrderStatus(orderId,orderStatus).subscribe(response => {
                this.getOrdersByProfileId(null,null);
              });
             }

          }
    });
    
   }
  
   DeleteOrderDetails(){
    this.salesOrderService.getOrderDetails(this.orderId).subscribe(response => {
      this.orderDetails = response;
      this.salesOrderService.deleteOderDetails(this.orderId,this.orderDetailsId,this.price).subscribe(response => {
        if(this.orderDetails.length <= 1){
          this.salesOrderService.deleteOderByOrderId(this.orderId).subscribe(response => {});
          this._location.back();
        }else{
          this.router.navigate(['/order/order-details/'+this.orderId + '/'+this.data.orderStatus+'/'+this.price]);
          this.ngOnInit();
        }
      });
     
    });
   }
   
   confirmAction(){
   
    if(this.data){
      if(this.data.actionMethod == "Cancel"){
        this.CancelOrder(this.data.orderId,this.data.orderStatus,null,null);
        this.close();
      }
      if(this.data.actionMethod == "Delete"){
        this.DeleteOrderDetails();
        this.close();
      }
    }
   }
   cancelAction(){
    this.close();
   }
   
  
}