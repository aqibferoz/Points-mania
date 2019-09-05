import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api/api.service';
import { isNgTemplate } from '@angular/compiler';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
totalAmount=0;
totalGame=0;
  constructor(private api:ApiService) {
    if(this.api.order.cart.length>0){
      this.total();
    }
    else if(this.api.gameOrder.cart.length>0){
this.gameTotal();
console.log("object");
    }
    
   }

  ngOnInit() {
    this.total();
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
  delete(indx){
    console.log(indx);
    let index = this.api.order.cart.findIndex(element => element.id === indx.id);
    this.api.order.cart.splice(index, 1);
    // console.log(this.package);
    this.total();
    }
    deleteGame(indx){
      console.log(indx);
      let index = this.api.gameOrder.cart.findIndex(element => element.id === indx.id);
      this.api.gameOrder.cart.splice(index, 1);
      // console.log(this.package);
      this.gameTotal();
    }

}
