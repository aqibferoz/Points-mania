import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api/api.service';
import {map, first} from 'rxjs/operators'
import { Router } from '@angular/router';
@Component({
  selector: 'app-playcards',
  templateUrl: './playcards.page.html',
  styleUrls: ['./playcards.page.scss'],
})
export class PlaycardsPage implements OnInit {
playcards;
view=true;
  constructor(private api:ApiService,private router:Router) { }

  ngOnInit() {
    this.api.getPlayCards().pipe(map(list=>list.map(item=>{
      let data =item.payload.doc.data();
      let id =item.payload.doc.id;
      return{id,...data}
    }))).subscribe(res=>{
    this.playcards=res;
    console.log(this.playcards);
    })
  }
  gridView(){
    if(this.view==true){
      this.view=false;
    }else{
      this.view=true;
    }

  }

  viewPlayCard(item){
    this.router.navigate(['/game-description/'+item.id]);
  }
}
