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
  constructor(private api:ApiService,private route:ActivatedRoute,private helper:HelperService) {
    this.helper.presentLoading("Fetching Details")
this.id=this.route.snapshot.paramMap.get('id');
this.api.getSingleOrder(this.id).subscribe(res=>{
  this.order=res;
  console.log(this.order);
  this.helper.dismissLoad();
})
   }

  ngOnInit() {
  }

}
