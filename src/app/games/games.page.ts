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
  constructor(private router :Router,private api:ApiService) { }

  ngOnInit() {
    this.getGames();
    this.getPlayCard();
    this.getProducts();
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
