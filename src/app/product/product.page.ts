import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api/api.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
})
export class ProductPage implements OnInit {
quantity:number=1;
prdId;
prd;
  constructor(private api:ApiService,private router:Router,private route:ActivatedRoute) { 

this.prdId=this.route.snapshot.paramMap.get('id');
console.log(this.prdId);
this.api.getSingleProduct(this.prdId).subscribe(res=>{
this.prd=res;
console.log(this.prd);
})
  }

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
      product:this.prd,
      quantity:this.quantity,
      generalTotal:this.prd.price*this.quantity
    }
    this.api.order.cart.push(data);
    localStorage.setItem('productCart', JSON.stringify(this.api.order.cart));
    console.log(this.api.order.cart);
    this.quantity=1;
  }
  buyNow(){
    let data={
      product:this.prd,
      quantity:this.quantity,
      generalTotal:this.prd.price*this.quantity
    }
    this.api.order.cart.push(data);
    localStorage.setItem('productCart', JSON.stringify(this.api.order.cart));
    console.log(this.api.order.cart);
    this.quantity=1;
    this.router.navigate(['cart']);
  }

}
