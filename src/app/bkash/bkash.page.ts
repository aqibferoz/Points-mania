import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api/api.service';
import { first,map } from 'rxjs/operators';
import { Clipboard } from '@ionic-native/clipboard/ngx';
import { HelperService } from '../services/helper/helper.service';


@Component({
  selector: 'app-bkash',
  templateUrl: './bkash.page.html',
  styleUrls: ['./bkash.page.scss'],
})
export class BkashPage implements OnInit {
currentOrder;
time;
id;
  constructor(private api:ApiService,private clip:Clipboard,private helper:HelperService) { 

    console.log(this.api.previousOrders);
    this.getOrder();
  }

  ngOnInit() {
    // this.getOrder();
  }
getOrder(){
  this.api.getCurrentOrder(localStorage.getItem('userId')).pipe(map(list=>list.map(item=>{
    let data =item.payload.doc.data();
    let id =item.payload.doc.id;
    return{id,...data}
  })),first()).subscribe((res:any)=>{
    let oldArray=[];
  this.api.previousOrders.forEach(element => {
    oldArray.push(element.id)
  });
  let newArray=[];
  res.forEach(element => {
    newArray.push(element.id)
  });

  var array3 = newArray.filter(function(obj) { return oldArray.indexOf(obj) == -1; });
  console.log(array3);
  this.api.getSingleOrder(array3[0]).subscribe((resp:any)=>{
    this.currentOrder=resp;

console.log(res);
this.currentOrder.id=array3[0];
this.id=this.currentOrder.id;
var day = new Date(resp.createdDate);
var nextDay = new Date(day);
      nextDay.setDate(day.getDate() + 1);
console.log(nextDay);
let a = Date.now()
var t1 = new Date(a);
var t2 = new Date(nextDay);
var dif = t1.getTime() - t2.getTime();

var Seconds_from_T1_to_T2 = dif / 1000;
var Seconds_Between_Dates = Math.abs(Seconds_from_T1_to_T2);
this.time=Seconds_Between_Dates;
})
  })
}
copyText(text){
  this.clip.copy(text);
  this.helper.presentToast('Ref# Copied on Clipboard !')
}
ionViewDidLeave() {
  this.currentOrder=[];
  this.time=null;
}
ionViewDidEnter() {
this.getOrder();
}

}
