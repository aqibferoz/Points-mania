import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api/api.service';
import { HelperService } from '../services/helper/helper.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.page.html',
  styleUrls: ['./contact-us.page.scss'],
})
export class ContactUsPage implements OnInit {
type='other';
orderNo;
subject;
message;
email;
username;
  constructor(private api:ApiService,private helper:HelperService) { }

  ngOnInit() {
    this.api.getUser(localStorage.getItem('userId')).subscribe((res:any)=>{
this.email=res.email;
this.username=res.username;
    })
  }
check(event){
console.log(event.target.value);
if(event.target.value=='other'){
  this.type='other'
}else if(event.target.value=='order'){
  this.type='order'
}
}
otherQuery(){
  if(
    this.subject!=null&& this.subject!=''&&
  this.message !=null && this.message!=''
  

  ){
    this.helper.presentLoading('Submitting your request');
    let data={
      name:this.username,
      email:this.email,
      subject:this.subject,
      message:this.message,
      type:"other"
    }
    console.log(data);
    this.api.submitQuery(data).then(res=>{
      this.helper.dismissLoad();
  this.helper.presentToast('Stay Calm ! Let us see what can we provide you against your request')
    }).catch(err=>{
      this.helper.dismissLoad();
      this.helper.presentToast('Something Went wrong');
    })
  }else{
    this.helper.presentToast
  }

}
orderQuery(){
  if(
    this.subject!=null&& this.subject!=''&&
  this.message !=null && this.message!=''&&
  this.orderNo!=null&& this.orderNo!=''

  ){

  }
  let data={
    name:this.username,
    email:this.email,
    subject:this.subject,
    message:this.message,
    orderNo:this.orderNo,
    type:"order"
  }
  console.log(data);
  this.api.submitQuery(data).then(res=>{
    this.helper.dismissLoad();
this.helper.presentToast('Stay Calm ! Let us see what can we provide you against your request')
  }).catch(err=>{
    this.helper.dismissLoad();
    this.helper.presentToast('Something Went wrong');
  })
}
}
