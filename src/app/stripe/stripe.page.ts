import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api/api.service';
import{Stripe} from '@ionic-native/stripe/ngx';
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-stripe',
  templateUrl: './stripe.page.html',
  styleUrls: ['./stripe.page.scss'],
})
export class StripePage implements OnInit {
date="2025-12";
open=false;
dollar;
paymentAmount:string ;
currency:string;
stripe_key='pk_test_cJmghymBoEPLI11Kvd1lxk5q';
cardDetails:any={};
cardHolderName;
cardNumber;
cvc;
  constructor(private api:ApiService,private stripe:Stripe,private http: HttpClient) { }

  ngOnInit() {
    if(this.api.order.cart.length>0){
      this.convertIntoDollar(this.api.order.currency);
    }
    else if(this.api.gameOrder.cart.length>0){
      this.convertIntoDollar(this.api.gameOrder.currency);
    }
  }
  change(){
    console.log(this.date);
  }
openCvc(){
  if(this.open==true){
    this.open=false;
  }else{
    this.open=true;

  }
}
convertIntoDollar(amount){
  this.api.convertIntoDollar(amount).subscribe(res=>{
    let b=Object.values(res);
  

  // let a = 'USD_'+b;
  console.log(b[0]);

  })
}

payWithStripe() {
  var dateObj = new Date(this.date);
  var month = dateObj.getUTCMonth() + 1; //months from 1-12

  var year = dateObj.getUTCFullYear();
  this.stripe.setPublishableKey(this.stripe_key);

  this.cardDetails = {
    number: this.cardNumber,
    expMonth: month,
    expYear: year,
    cvc: this.cvc
  }
  console.log(this.cardDetails);

  this.stripe.createCardToken(this.cardDetails)
    .then(token => {
      console.log(token);
      this.makePayment(token.id);
    })
    .catch(error => console.error(error));
}
makePayment(token) {
  this.http
  .post(
  'http://localhost:5000/points-809fd/us-central1/payWithStripe', {
  amount: 100,
  currency: "usd",
 description:'testing'
  })
  .subscribe(data => {
  console.log(data);
  });
  }
}
