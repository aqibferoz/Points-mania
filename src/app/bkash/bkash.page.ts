import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api/api.service';
import { first,map } from 'rxjs/operators';

@Component({
  selector: 'app-bkash',
  templateUrl: './bkash.page.html',
  styleUrls: ['./bkash.page.scss'],
})
export class BkashPage implements OnInit {
currentOrder;
  constructor(private api:ApiService) { }

  ngOnInit() {this.getOrder();
  }
getOrder(){
  this.api.getCurrentOrder(localStorage.getItem('userId')).pipe(map(list=>list.map(item=>{
    let data =item.payload.doc.data();
    let id =item.payload.doc.id;
    return{id,...data}
  })),first()).subscribe((res:any)=>{
console.log(res);
this.currentOrder=res[0];

  })
}
}
