import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api/api.service';
import {map, first} from 'rxjs/operators'
@Component({
  selector: 'app-playcards',
  templateUrl: './playcards.page.html',
  styleUrls: ['./playcards.page.scss'],
})
export class PlaycardsPage implements OnInit {
playcards;
  constructor(private api:ApiService) { }

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

}
