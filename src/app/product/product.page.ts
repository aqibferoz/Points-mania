import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
})
export class ProductPage implements OnInit {
quantity:number=1;
  constructor(private api:ApiService,private router:Router) { }

  ngOnInit() {
  }
  remove(){
    if(this.quantity>0){
      this.quantity=this.quantity-1;
    }
   
    
  }
  add(){
    this.quantity=this.quantity+1;
  }
  addToCart(){
    let data={
      product:this.item,
      quantity:this.quantity
    }
    this.api.order.cart.push(data);
    localStorage.setItem('productCart', JSON.stringify(this.api.order.cart));
    console.log(this.api.order.cart);
    this.quantity=1;
  }
  buyNow(){
    let data={
      product:this.item,
      quantity:this.quantity
    }
    this.api.order.cart.push(data);
    localStorage.setItem('productCart', JSON.stringify(this.api.order.cart));
    console.log(this.api.order.cart);
    this.quantity=1;
    this.router.navigate(['cart']);
  }

}
