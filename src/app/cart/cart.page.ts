import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api/api.service';
import { isNgTemplate } from '@angular/compiler';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
totalAmount=0;
  constructor(private api:ApiService, private router: Router) {
    this.total();
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
  delete(indx){
    console.log(indx);
    let index = this.api.order.cart.findIndex(element => element.id === indx.id);
    this.api.order.cart.splice(index, 1);
    // console.log(this.package);
    this.total();
    }

    checkout(){
      this.router.navigate(['/checkout'])
    }

}
