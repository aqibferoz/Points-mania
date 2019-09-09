import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api/api.service';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';

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
userName;
  constructor(private api:ApiService,private router:Router) { }

  ngOnInit() {
    this.api.getUser(localStorage.getItem('userId')).pipe(first()).toPromise().then((resp:any)=>{
      this.email=resp.email;
      this.country=resp.userCountry;
      this.userName=resp.username;
      this.city=resp.city;
      this.address=resp.address;
      this.post_code=resp.postCode;
      this.phone_number=resp.phoneNumber;
      this.fname=resp.firstName;
      this.lname=resp.lastName;

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
this.api.order.address=this.address;
this.api.order.city=this.city;
this.api.order.currency=this.c_symbol;
this.api.order.customerEmail=this.email;
this.api.order.customerId=localStorage.getItem('userId');
this.api.order.firstName=this.fname;
this.api.order.lastName=this.lname;
this.api.order.country=this.country;
this.api.order.phoneNumber=this.phone_number;
this.api.order.postCode=this.post_code;
this.api.order.type='product',
this.api.order.totalAmount=this.totalAmount;
this.api.order.customerUserName=this.userName;
let data={
  firstName:this.fname,
  lastName:this.lname,
  phoneNumber:this.phone_number,
  city:this.city,
  address:this.address,
  postCode:this.post_code,

}
this.api.updateUser(localStorage.getItem('userId'),data).then(res=>{
  console.log("user Updated");
  this.router.navigate(['choose-payment']);
})


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

this.api.gameOrder.totalAmount=this.totalGame;
this.api.gameOrder.phoneNumber=this.phone_number;
this.api.gameOrder.lastName=this.lname;
this.api.gameOrder.firstName=this.fname;
this.api.gameOrder.customerId=localStorage.getItem('userId');
this.api.gameOrder.customerEmail=this.email;
this.api.gameOrder.currency=this.c_symbol;
this.api.gameOrder.customerUserName=this.userName;
let data={
  firstName:this.fname,
  lastName:this.lname,
  phoneNumber:this.phone_number,


}
this.api.updateUser(localStorage.getItem('userId'),data).then(res=>{
  console.log("user Updated");
  this.router.navigate(['choose-payment']);
})
        }
        else{
          alert("please FIll all Fields ");
        }
      }
    }
}
