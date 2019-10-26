import { Component, OnInit,Input } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {

  constructor(private nav:NavController) { }

@Input() orderImg:boolean;
@Input() contactImg:boolean;
imageurl="../../assets/icon/box-w.png";
contacturl="../../assets/icon/contact-us-w.png"

  ngOnInit() {
if(this.orderImg==true){
  this.imageurl='../../assets/icon/box-b.png'
}
if(this.contactImg==true){
this.contacturl="../../assets/icon/contact-us-b.png"
}
  }
order(){

this.imageurl="../../assets/icon/box-b.png"
this.nav.navigateRoot('/orders');

}
home(){
 
  this.nav.navigateRoot('/games')


}
contact(){
 
  this.nav.navigateRoot('/contact-us')
  ;



}
}
