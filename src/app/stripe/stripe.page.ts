import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stripe',
  templateUrl: './stripe.page.html',
  styleUrls: ['./stripe.page.scss'],
})
export class StripePage implements OnInit {
date="2025-12-15T13:47:20.789";
open=false;
  constructor() { }

  ngOnInit() {
  }
  change(){
    console.log(this.date);
  }
openCvc(){
  if(this.open==true){
    this.open=false;
  }else{
    this.open=true;

  }
}
}
