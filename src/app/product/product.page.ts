import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
})
export class ProductPage implements OnInit {
quantity:number=1;
  constructor() { }

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

}
