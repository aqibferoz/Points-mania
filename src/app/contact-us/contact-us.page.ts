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
  console.log("other");
  if(
    this.subject!=null&& this.subject!=''&&
  this.message !=null && this.message!=''
  ){
    this.helper.presentLoading('Submitting your request..');
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
      this.subject='';
      this.message='';
  this.helper.presentToast('Stay Calm ! Let us see what can we provide you against your request')
    }).catch(err=>{
      this.helper.dismissLoad();
      this.helper.presentToast('Something Went wrong');
    })
  }else{
    this.helper.dismissLoad();
    this.helper.presentToast('Please Fill All Inputs')
  }

}
orderQuery(){
  if(
    this.subject!=null&& this.subject!=''&&
  this.message !=null && this.message!=''&&
  this.orderNo!=null&& this.orderNo!=''

  ){
    this.helper.presentLoading('Submitting your request..');
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
      this.subject='';
      this.message='';
      this.orderNo='';
  this.helper.presentToast('Stay Calm ! Let us see what can we provide you against your request')
    }).catch(err=>{
      this.helper.dismissLoad();
      this.helper.presentToast('Something Went wrong');
    })
  }
  else{
    this.helper.dismissLoad();
    this.helper.presentToast('Please Fill All Inputs')
  }

}
}
