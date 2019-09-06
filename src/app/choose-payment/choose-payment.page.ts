import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-choose-payment',
  templateUrl: './choose-payment.page.html',
  styleUrls: ['./choose-payment.page.scss'],
})
export class ChoosePaymentPage implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }
card(){
this.router.navigate(['/stripe']);
}
bkash(){
this.router.navigate(['/bkash']);
}
}
