import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

email='';
userName='';
phoneNumber='';
code='';
playerId='';
password='';
dummyArray;
selectedPackage;
c_symbol;
  constructor(private route:ActivatedRoute,private api:ApiService,private router:Router) {
    this.id=this.route.snapshot.paramMap.get('id');
    this.api.getSingleGame(this.id).subscribe(res=>{
      console.log(res);
      this.prd=res;
      this.c_symbol=this.api.user_currency;
      this.prd.packages.map(item=>{
        return item['amount']=Math.round( item.amount *this.api.currency_value)
      })
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

addToCart(){
  if(this.api.order.cart.length==0){
    if(this.prd.type!=null){

  let data={
    catagory:this.prd.game,
    description:this.prd.description,
    image:this.prd.image,
    inputemail:this.email,
    inputpassword:this.password,
    inputcode:this.code,
    inputphonenumber:this.phoneNumber,
    inputusername:this.userName,
    inputplayerid:this.playerId,
    inputs:this.prd.inputs,
    name:this.prd.name,
    packages:this.prd.packages,
    price:this.prd.price,
    quantity:this.prd.quantity,
    type:this.prd.type,
    id:this.api.gameOrder.cart.length+1
    
  }
   
    this.api.gameOrder.cart.push(data);
    localStorage.setItem('gameCart', JSON.stringify(this.api.gameOrder.cart));
    console.log(this.api.gameOrder.cart);
    this.prd.price=null;
    this.prd.quantity=null;
    this.prd.type=null;

    this.prd.packages.map(ele=>{
   
      return ele['selected']=false
  
  })
  
  }else{
      alert("please select packgae ")
    }
  }else{
    alert("you have different products in cart , to buy this you must clear your cart or complete current cart order!")
  }

  
}
buyNow(){
  if(this.api.order.cart.length==0){
    if(this.prd.type!=null){

    
    let data={
      catagory:this.prd.game,
      description:this.prd.description,
      image:this.prd.image,
      inputemail:this.email,
      inputpassword:this.password,
      inputcode:this.code,
      inputphonenumber:this.phoneNumber,
      inputusername:this.userName,
      inputplayerid:this.playerId,
      inputs:this.prd.inputs,
      name:this.prd.name,
      packages:this.prd.packages,
      price:this.prd.price,
      quantity:this.prd.quantity,
      type:this.prd.type,
      id:this.api.gameOrder.cart.length+1
      
    }

 
  this.api.gameOrder.cart.push(data);
  localStorage.setItem('gameCart', JSON.stringify(this.api.gameOrder.cart));
  console.log(this.api.gameOrder.cart);
  this.prd.price=null;
  this.prd.quantity=null;

  this.prd.type=null;
  this.prd.packages.map(ele=>{
   
      return ele['selected']=false
  
  })


  this.router.navigate(['/cart']);}else{
    alert("please select packgae ")
  }
  }else{
    alert("you have different products in cart , to buy this you must clear your cart or complete current cart order!")

  }
}
}
