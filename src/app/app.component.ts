import { Component, ElementRef, ViewChild, Renderer } from '@angular/core';

import { Platform, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ApiService } from './services/api/api.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  @ViewChild('menu', {static: false}) menu: ElementRef;
  public appPages = [
    {
      title: 'Home',
      url: '/games',
      icon:'home'
     
    },
    {
      title: 'Orders',
      url: '/orders',
      icon:'list-box'
      
    },
    {
      title: 'Contact Us',
      url: '/contact-us',
      icon:'mail'
      
    },

  

  ];
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,private api:ApiService,private nav:NavController,
    public renderer: Renderer
  ) {
    this.initializeApp();
    if(localStorage.getItem('userId')){
      this.nav.navigateRoot(['games']);
      let a=JSON.parse(localStorage.getItem('productCart')) ;
      let b =JSON.parse(localStorage.getItem('gameCart')) ;
    console.log(a);
    console.log(b);
    if(a){
      this.api.order.cart=a;

    }else if(b){
      this.api.gameOrder.cart=b;
    }
    }
    else{
      this.nav.navigateRoot(['signup'])
    }


 
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.statusBar.overlaysWebView(true);

    
      this.splashScreen.hide();
    });
  }
  logout(){
  localStorage.clear();
this.nav.navigateRoot(['signin']);
  }
}
  