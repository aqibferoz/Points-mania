import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api/api.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
totalAmount=0;
  constructor(private api:ApiService) { }

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

}
