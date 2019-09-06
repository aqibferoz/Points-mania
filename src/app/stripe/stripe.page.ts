import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api/api.service';

@Component({
  selector: 'app-stripe',
  templateUrl: './stripe.page.html',
  styleUrls: ['./stripe.page.scss'],
})
export class StripePage implements OnInit {
date="2025-12-15T13:47:20.789";
open=false;
dollar;
  constructor(private api:ApiService) { }

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
  this.dollar=b[0]
  })
}
}
