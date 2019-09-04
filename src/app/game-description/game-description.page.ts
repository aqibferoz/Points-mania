import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api/api.service';
import { element } from 'protractor';

@Component({
  selector: 'app-game-description',
  templateUrl: './game-description.page.html',
  styleUrls: ['./game-description.page.scss'],
})
export class GameDescriptionPage implements OnInit {
id;
prd;
emailinput=false;
passwordinput=false;
codeinput=false;
playeridinput=false;
phonenumberinput=false;
usernameinput=false;

email;
userName;
phoneNumber;
code;
playerId;
password;
dummyArray;
selectedPackage;
  constructor(private route:ActivatedRoute,private api:ApiService) {
    this.id=this.route.snapshot.paramMap.get('id');
    this.api.getSingleGame(this.id).subscribe(res=>{
      console.log(res);
      this.prd=res;
      this.dummyArray=res;
      if(this.prd.inputs.includes('email')){
        this.emailinput=true;
        console.log("email");
      }
       if( this.prd.inputs.includes('code')){
        this.codeinput=true;
        console.log("code");
      }
       if( this.prd.inputs.includes('phone')){
        this.phonenumberinput=true;
        console.log("phone");
      }
      if( this.prd.inputs.includes('password')){
        this.passwordinput=true;
        console.log("password");
      }
      if( this.prd.inputs.includes('player id')){
        this.playeridinput=true;
        console.log("player");
      }
     if( this.prd.inputs.includes('user name')){
        this.usernameinput=true;
        console.log("username");
      }
    })
   }

  ngOnInit() {
  }
  selectPackage(item){
    
console.log(item);
this.prd.packages.map(ele=>{
  if(ele.id==item.id){
    return ele['selected']=true
  }else{
    return ele['selected']=false
  }
})
// console.log(this.prd);
this.selectedPackage=item;
console.log(this.selectedPackage);
this.prd.quantity=this.selectedPackage.quantity;
this.prd.price=this.selectedPackage.amount;
this.prd.type=this.selectedPackage.type;
console.log(this.prd);

  }
}
