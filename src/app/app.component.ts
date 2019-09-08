import { Component } from '@angular/core';

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
    private statusBar: StatusBar,private api:ApiService,private nav:NavController
  ) {
    if(localStorage.getItem('userId')){
      this.nav.navigateRoot(['games'])
    
    }
    else{
      this.nav.navigateRoot(['signup'])
    }
    this.initializeApp();

 
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
