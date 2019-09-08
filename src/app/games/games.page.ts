import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api/api.service';
import {map, first} from 'rxjs/operators'

@Component({
  selector: 'app-games',
  templateUrl: './games.page.html',
  styleUrls: ['./games.page.scss'],
})
export class GamesPage implements OnInit {
games;
playcards;
products;
c_symbol;
  constructor(private router :Router,private api:ApiService) { }

  ngOnInit() {
    
    console.log(this.api.currency_value);
    if(this.api.user_currency ==null && this.api.user_country==null && this.api.currency_value ==null){

   
    this.api.getUser(localStorage.getItem('userId')).pipe(first()).toPromise().then((res:any)=>{
      this.api.user_country=res.userCountry;
      this.api.user_currency=res.userCurrency;
      console.log(this.api.user_country);
      console.log(this.api.user_currency);
      this.api.convertCurrency(this.api.user_currency).subscribe(res=>{
        console.log(res);
        this.api.currency_value=res
let b=Object.values(res);

// let a = 'USD_'+b;
console.log(b[0]);
this.api.currency_value=b[0]
// console.log(res.a);
        
        this.getGames();
        this.getPlayCard();
        this.getProducts();
        this.c_symbol=this.api.user_currency;
      })
    });
  }else{
    this.c_symbol=this.api.user_currency;
    this.getGames();
    this.getPlayCard();
    this.getProducts();
  }
   
  
 
  }




  product(id){
this.router.navigate(['product/'+id])
  } 
  cart(){
   this.router.navigate(['cart']); 
  }
  getGames(){
    console.log("object");
this.api.getGames().pipe(map(list=>list.map(item=>{
  let data =item.payload.doc.data();
  let id =item.payload.doc.id;
  return{id,...data}
}))).subscribe(res=>{
this.games=res;
this.games.forEach(element => {
  element.packages.map(item=>{

    return item['amount']=Math.round( item.amount *this.api.currency_value)
  })
});
console.log(this.games);
})
  }
  getProducts(){
    this.api.getProducts().pipe(map(list=>list.map(item=>{
      let data =item.payload.doc.data();
      let id =item.payload.doc.id;
      return{id,...data}
    }))).subscribe(res=>{
    this.products=res;
    this.products.map(item=>{
      return item['price']=Math.round( item.price *this.api.currency_value)
    })
    console.log(this.products);
    })
  }
  getPlayCard(){
    this.api.getPlayCards().pipe(map(list=>list.map(item=>{
      let data =item.payload.doc.data();
      let id =item.payload.doc.id;
      return{id,...data}
    }))).subscribe(res=>{
    this.playcards=res;
    console.log(this.playcards);
    })
  }
  playCards(id){
    console.log(id);
    this.router.navigate(['/game-description/'+id]);
  }
  openGame(id){
    this.router.navigate(['/game-description/'+id]);
  }
}
