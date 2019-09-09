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
dummyProducts;
dummyGames;
dummyPlayCards;
filterText;
notFound=false;
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
this.dummyGames=res;
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
      console.log(res);
    this.products=res;
    this.dummyProducts=res;
    this.products.map(item=>{
      return item['price']=Math.round( item.price *this.api.currency_value)
    })
    console.log(this.products);
    // this.dummyProducts.map(item=>{
    //   return item['price']=Math.round( item.price *this.api.currency_value)
    // })
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
    this.dummyPlayCards=res;
    })
  }
  playCards(id){
    console.log(id);
    this.router.navigate(['/game-description/'+id]);
  }
  openGame(id){
    this.router.navigate(['/game-description/'+id]);
  }
  filter(event){
    console.log(this.filterText);
    if(this.filterText!=''){

   
    let b =this.dummyGames.filter(item=>{
      return item.name.includes(this.filterText)
    })
    console.log(b);
    this.games=b;
    let c =this.dummyPlayCards.filter(item=>{
      return item.name.includes(this.filterText)
    })
    this.playcards=c;
    console.log(c);
    let d =this.dummyProducts.filter(item=>{
      return item.name.includes(this.filterText)
    })
    this.products=d;
    console.log(d);
    if(c.length==0 && b.length==0 && d.length==0){
      this.notFound=true;
    }else{
      this.notFound=false;
    }
  }else{
    this.notFound=false;
    this.playcards=this.dummyPlayCards;
    this.products=this.dummyProducts
    this.games=this.dummyGames;
  }
}
}
