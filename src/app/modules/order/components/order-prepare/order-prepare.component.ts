import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { UserProfileModel } from 'src/app/modules/authentication/models/user-profile.model';
import { AuthService } from 'src/app/modules/authentication/services/auth.service';
import { ProductModalComponent } from 'src/app/modules/products/components/product-modal/product-modal.component';
import { OrderStatus } from 'src/app/shared/enums/order-status';
import { NgxLoadingModule } from 'ngx-loading';
import { SalesOrderService } from 'src/app/modules/cart/services/sales-order.service';
import { SalesSttings } from 'src/app/modules/authentication/models/sales-settings';
@Component({
  selector: 'app-order-prepare',
  templateUrl: './order-prepare.component.html',
  styleUrls: ['./order-prepare.component.scss']
})
export class OrderPrepareComponent implements OnInit {
  public getMyOrders:any;
  public loading = false;
  public pagination;
  public totalPage;
  public orderDetails ;
  public salesStatus;
  salesSttings = new SalesSttings();
  autoTax:any;
  discountTax:any;
  autoDiscount:any
  public tableNumber;
  public dialogMessage;
  public actionMethod;
  public myservice : any;
  public currentPage = 1;
  selected : number = 1;
  public  permission ;
  constructor(private authService: AuthService,
   private salesOrderService:SalesOrderService,private router: Router,private activatedRoute:ActivatedRoute,public dialog: MatDialog) {
    
    }
  userProfileModel : UserProfileModel;
  orderStatusEnum : OrderStatus;
  ngOnInit(): void {
   this.getSalesSttings();
    
    this.permission = this.authService.getUserSecurityObjectFRomLocalStorage();
    if(this.permission.length  == 0){
      this.router.navigate(['/']);
    }else{
      if(this.permission[0].ChildObjects[0].NavigateUrl != "/Ecommerce/prepareOrder"){
         this.router.navigate(['/']);
      }
    }
    this.userProfileModel = this.authService.getUserProfileFromLocalStorage();
    this.getOrdersByProfileId(null,null,0,10);
    this.activatedRoute.paramMap.subscribe(params => { 
    this.getOrdersByProfileId(null,null,0,10);
    
 });
   
  }
  getOrderId(orderId,orderStatus,total){
    this.getOrdersByProfileId(null,null,0,10);
    this.salesOrderService.getOrderById(null,null,orderId).subscribe(res=>{
      let keys = Object.keys(res);
      let values = Object.values(res);
       let len = keys.length;
         for (let i = 0; i < len; i++){
           if(values[i].SaleStatus){ 
            this.router.navigate(['/order/order-details/'+orderId + '/'+values[i].SaleStatus+'/'+total]);
           }
          }
    });
  }

  filter(str : any,f:any){
    if(f == 4){
      this.salesStatus = str;
    }else{
      this.tableNumber = str;
    }
    this.getOrdersByProfileId(this.salesStatus,this.tableNumber,0,10);
    

  }
  previouspagination(){
    if(this.currentPage !=1 ){
    var pageNumber = this.currentPage - 1;
    var start = ((pageNumber -1) * 10 ) + 1;
    var end = pageNumber * 10;
    this.getOrdersByProfileId(null,null,start,end);
    this.currentPage = this.currentPage - 1;
    }
    
  }

  nextpagination(){
    if(this.currentPage !=this.totalPage  ){
    var pageNumber = this.currentPage + 1;
    var start = ((pageNumber -1) * 10 ) + 1;
    var end = pageNumber * 10;
    this.getOrdersByProfileId(null,null,start,end);
    this.currentPage = this.currentPage + 1;
    }
  }
  paginationChange(pageNumber){
    this.currentPage = pageNumber;
    var start = ((pageNumber -1) * 10 ) + 1;
    var end = pageNumber * 10;
    this.getOrdersByProfileId(null,null,start,end);
  }
  getOrdersByProfileId(salesStatus,tableNumber,end,start){
    this.loading = true;
    if(this.permission.length  == 0){
      this.salesOrderService.getOrderByProfileId(salesStatus,tableNumber,end,start).subscribe(response => {
        this.getMyOrders = response;
        this.totalPage = Math.ceil(this.getMyOrders.TotalCount/10);
        this.pagination = Math.ceil(this.getMyOrders.TotalCount/10);
        this.pagination = Array(this.pagination).fill(this.pagination).map((x,i)=>i);
        this.loading = false;
        });
    }else{
      this.salesOrderService.getAllOrders(salesStatus,tableNumber,end,start).subscribe(res=>{
        this.getMyOrders = res;
        this.pagination =  Math.ceil(this.getMyOrders.TotalCount/10);
        this.totalPage = Math.ceil(this.getMyOrders.TotalCount/10);
        this.pagination = Array(this.pagination).fill(this.pagination,1).map((x,i)=>i);
        this.loading = false;
      });
    }
  
 }
 orderStatusUpdate(orderStatus,orderId){

  this.salesOrderService.getOrderById(null,null,orderId).subscribe(res=>{
    let keys = Object.keys(res);
      let values = Object.values(res);
       let len = keys.length;
         for (let i = 0; i < len; i++){
           if(values[i].SaleStatus != 2){ 
            this.salesOrderService.updateOrderStatus(orderId,orderStatus).subscribe(response => {
              this.getOrdersByProfileId(null,null,0,10);
            });
           }else{
            this.getOrdersByProfileId(null,null,0,10);
           }

        }
  });
 }
 CancelOrder(orderId,orderStatus){
  this.dialogMessage = "Do You Want Cancel Order?";
  this.actionMethod = "Cancel";
   this.openDialog(orderId,orderStatus);
/*
  this.salesOrderService.updateOrderStatus(orderId,orderStatus).subscribe(response => {
    this.getOrdersByProfileId(null,null);
  });*/
 }
 openDialog(orderId,orderStatus): void {
      const dialogRef = this.dialog.open(ProductModalComponent ,{
        width: '350px',
        height:' 165px',
        data:{message:this.dialogMessage,actionMethod:this.actionMethod,orderId:orderId,orderStatus:orderStatus}
      });
      dialogRef.afterClosed().subscribe(result => {
        this.getOrdersByProfileId(null,null,0,10);
      });
}
private getSalesSttings(){
  this.authService.getSalesSttings().subscribe(res=>{
    this.salesSttings = res;
    this.autoTax = this.salesSttings.AutomaticTax;
    this.discountTax = this.salesSttings.DiscountTax ;
    this.autoDiscount = this.salesSttings.AutomaticDiscount;
  });
}
}


