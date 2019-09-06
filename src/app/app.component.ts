import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
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
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,private api:ApiService
  ) {
    this.initializeApp();
    if(this.api.user_currency ==null && this.api.user_country==null && this.api.currency_value ==null){
      this.api.getUser(localStorage.getItem('userId')).pipe(first()).toPromise().then((res:any)=>{
        this.api.user_country=res.userCountry;
        this.api.user_currency=res.userCurrency;
        console.log(res);
        this.api.convertCurrency(this.api.user_currency).subscribe(res=>{
          console.log(res);
          this.api.currency_value=res
  let b=Object.values(res);
  

  // let a = 'USD_'+b;
  console.log(b[0]);
  this.api.currency_value=b[0]
        });
   
        console.log(this.api.user_country);
        console.log(this.api.user_currency);
      });
    }
 
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
