import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api/api.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit {
totalAmount;
totalGame;
c_symbol;
  constructor(private api:ApiService) { }

  ngOnInit() {
    if(this.api.order.cart.length>0){
      this.total();
    }
    else if(this.api.gameOrder.cart.length>0){
this.gameTotal();
console.log("object");
    }
    this.c_symbol=this.api.user_currency;
  }
totalProduct(){

}
total(){
  let all=0;
  this.api.order.cart.forEach(elem=>{
   all= elem.generalTotal+all;
  })
  this.totalAmount=all;
    }
    gameTotal(){
      let all=0;
  this.api.gameOrder.cart.forEach(elem=>{
   all= elem.price+all;
   console.log(all);
  })
  this.totalGame=all;
    }
}
