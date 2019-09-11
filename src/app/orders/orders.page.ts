import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api/api.service';
import { first,map } from 'rxjs/operators';
import { HelperService } from '../services/helper/helper.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit {

  constructor(private api:ApiService,private helper:HelperService,private router:Router) { }
orders;
  ngOnInit() {
    this.helper.presentLoading('Getting Results');
    this.getAllOrders();
  }
getAllOrders(){
  
  this.api.getCurrentOrder(localStorage.getItem('userId')).pipe(map(list=>list.map(item=>{
    let data =item.payload.doc.data();
    let id =item.payload.doc.id;
    return{id,...data}
  }))).subscribe((res:any)=>{
    this.helper.dismissLoad();
console.log(res);
this.orders=res;

  })
}
getPaymentPendingOrders(){

  let a = this.orders.filter(item=>{
    return item.payment==false;
  })
  this.orders=a

}
getDeliveredOrders(){
  let a = this.orders.filter(item=>{
    return item.status=='Delivered';
  })
  this.orders=a
}
getUnderDeliveredOrders(){
  let a = this.orders.filter(item=>{
    return item.status=='notDelivered';
  })
  this.orders=a
}
filter(event){
console.log(event.target.value);
if(event.target.value=='due'){
  this.getPaymentPendingOrders();
}
else if(event.target.value=='complete'){
this.getDeliveredOrders();
}
else if(event.target.value=='under'){
  this.getUnderDeliveredOrders();
  }
  else if(event.target.value=='all'){
    this.getAllOrders();
    }

}
viewOrder(item){
  console.log(item);
  this.router.navigate(['/order/'+item.id]);
}
}
