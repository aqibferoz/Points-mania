import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HelperService } from '../services/helper/helper.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
})
export class ProductPage implements OnInit {
  quantity: number = 1;
  prdId;
  prd;
  c_symbol;
  constructor(private api: ApiService, private router: Router, private route: ActivatedRoute,private helper:HelperService) {

    this.prdId = this.route.snapshot.paramMap.get('id');
    console.log(this.prdId);
    this.api.getSingleProduct(this.prdId).subscribe(res => {
      this.prd = res;
      this.prd.price= Math.round( this.prd.price *this.api.currency_value)
   
     
      console.log(this.prd);
    })
  }

  ngOnInit() {
    this.c_symbol=this.api.user_currency;
  }
  remove() {
    if (this.quantity > 1) {
      this.quantity = this.quantity - 1;
    }


  }
  add() {
    if(this.quantity<=15){

  
    this.quantity = this.quantity + 1;
  }else{
    this.helper.presentToast('You Reached Maximum Quantity !')
  }

  }
  addToCart() {
    if (this.api.gameOrder.cart.length == 0) {


      let data = {
        product: this.prd,
        quantity: this.quantity,
        generalTotal: this.prd.price * this.quantity
      }
      this.api.order.cart.push(data);
      localStorage.setItem('productCart', JSON.stringify(this.api.order.cart));
      console.log(this.api.order.cart);
      this.quantity = 1;
    }
     else {
      alert("you have different products in cart , to buy this you must clear your cart or complete current cart order!")
this.router.navigate(['/cart']);
    }
  }
  buyNow() {
    if(this.api.gameOrder.cart.length==0){

    
    let data = {
      product: this.prd,
      quantity: this.quantity,
      generalTotal: this.prd.price * this.quantity
    }
    this.api.order.cart.push(data);
    localStorage.setItem('productCart', JSON.stringify(this.api.order.cart));
    console.log(this.api.order.cart);
    this.quantity = 1;
    this.router.navigate(['/cart']);
  }
  else{
    alert("you have different products in cart , to buy this you must clear your cart or complete current cart order!")
    this.router.navigate(['/cart']);
  }
  }

}
