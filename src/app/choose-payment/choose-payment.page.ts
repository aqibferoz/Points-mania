import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api/api.service';

@Component({
  selector: 'app-choose-payment',
  templateUrl: './choose-payment.page.html',
  styleUrls: ['./choose-payment.page.scss'],
})
export class ChoosePaymentPage implements OnInit {
c_symbol;
  constructor(private router:Router,private api:ApiService) {
    if(this.api.gameOrder.cart.length==0 && this.api.order.cart.length==0){
      this.router.navigate(['games']);
    }
    this.c_symbol=this.api.user_currency;
    console.log(this.c_symbol);
   }

  ngOnInit() {
  }
card(){
this.router.navigate(['/stripe']);
}
bkash(){

  if(this.api.order.cart.length>0){
    console.log(this.api.order);
    this.api.createOrder(this.api.order).then(res=>{
      console.log("order created");
      let amount=this.api.order.totalAmount;
      
      localStorage.removeItem('productCart');
      this.api.order.cart=[];
      this.router.navigate(['/bkash/'+amount]);
    })
  }else{
    if(this.api.gameOrder.cart.length>0){
      console.log(this.api.gameOrder);
      this.api.createOrder(this.api.gameOrder).then(res=>{
        console.log("order created");
        let amount=this.api.gameOrder.totalAmount;
        localStorage.removeItem('gameCart');
        this.api.gameOrder.cart=[];
        this.router.navigate(['/bkash/'+amount]);
      })
    }
  }



}
}
