import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api/api.service';
import { HelperService } from '../services/helper/helper.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
})
export class OrderPage implements OnInit {
id;
order;
date=Date.now();
time;
  constructor(private api:ApiService,private route:ActivatedRoute,private helper:HelperService) {
    this.helper.presentLoading("Fetching Details")
this.id=this.route.snapshot.paramMap.get('id');
this.api.getSingleOrder(this.id).subscribe(res=>{
  this.order=res;
  console.log(this.order);
  var day = new Date(this.order.createdDate);
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
console.log(Seconds_Between_Dates);
  this.helper.dismissLoad();
})
   }

  ngOnInit() {
  }

}
