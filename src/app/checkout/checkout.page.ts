import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api/api.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit {
totalAmount;
totalGame;
c_symbol;
fname;
lname;
address;
post_code;
city;
country;
phone_number;
email;
  constructor(private api:ApiService) { }

  ngOnInit() {
    this.api.getUser(localStorage.getItem('userId')).pipe(first()).toPromise().then((resp:any)=>{
      this.email=resp.email;
      this.country=resp.userCountry;

    })
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
    placeOrder(){
      if(this.api.order.cart.length>0){
        if(
          this.email!=null&& this.email!='' &&
          this.fname!=null&& this.fname!=''&&
          this.lname!=null && this.lname!=''&&
          this.address!=null && this.address!=''&&
          this.post_code!=null && 
          this.city!=null && this.city!=''&&
          this.country!=null && this.country!=''&&
          this.phone_number!=null 
        ){


        }
        else{
          alert("please FIll all Fields ");
        }
      }
      else if(this.api.gameOrder.cart.length>0){
        if(
          this.email!=null&& this.email!='' &&
          this.fname!=null&& this.fname!=''&&
          this.lname!=null && this.lname!=''&&
          this.phone_number!=null 
        ){


        }
        else{
          alert("please FIll all Fields ");
        }
      }
    }
}
