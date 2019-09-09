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
    this.c_symbol=this.api.user_currency;
    console.log(this.c_symbol);
   }

  ngOnInit() {
  }
card(){
this.router.navigate(['/stripe']);
}
bkash(){
this.router.navigate(['/bkash']);
}
}
