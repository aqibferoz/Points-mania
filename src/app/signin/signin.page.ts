import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { ApiService } from '../services/api/api.service';
import { Router } from '@angular/router';
import { HelperService } from '../services/helper/helper.service';
import { NavController, AlertController } from '@ionic/angular';
import { map, first } from 'rxjs/operators';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {

  username;
  password;
  email;
  passwordShown: boolean = false;

  constructor(private auth: AuthService, private navCtrl: NavController, private alertCtrl: AlertController,
    private api: ApiService,private router:Router,private helper:HelperService) { }

  ngOnInit() {
  }
  passwordType: string = 'password';
  passwordIcon: string = 'eye-off';

  togglePassword() {
    console.log('yes')
    if (this.passwordShown) {
      this.passwordShown = false;
      this.passwordType = 'password';
    } else {
      this.passwordShown = true;
      this.passwordType = 'password';
    }
  }
  hideShowPassword() {
    console.log("object");
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
  }
  async login() {
    this.helper.presentLoading('Recognising your Request');
    console.log(this.validateEmail(this.username));
    if (await this.validateEmail(this.username) == true) {
      this.auth.login(this.username, this.password).then(res => {
        this.helper.dismissLoad();
        this.helper.presentToast('Login successfully')
      
        this.router.navigate(['/games'])
        console.log('loged in')
      })
        .catch((error) => {
          console.log(error);
          // User couldn't sign in (bad verification code?)
          this.helper.presentToast(error.message);
          this.helper.dismissLoad();
          // ...
        });
    }
    else {

      this.api.checkUser(this.username).pipe(map(list => list.map(item => {
        let data = item.payload.doc.data();
        let id = item.payload.doc.id;
        return { data }
      })),first()).toPromise().then((res: any) => {
        console.log(res)
        if (res) {
          if (res.length > 0) {
            this.email = res[0].data.email;
            this.auth.login(this.email, this.password).then(res => {
              this.helper.dismissLoad();
              this.helper.presentToast('Login successfully')
              localStorage.setItem('userId',res.user.uid);
              this.router.navigateByUrl('/games');
              console.log('loged in')
            })
              .catch((error) => {
                console.log(error);

                // User couldn't sign in (bad verification code?)
                this.helper.presentToast(error.message);
                this.helper.dismissLoad();
                // ...
              });
          }
          else {
            this.helper.dismissLoad();
            console.log("usernot exist");

            this.helper.presentToast('User doesnot exist');

          }
        }
        else {

          this.helper.dismissLoad();
          this.helper.presentToast("good")
          console.log(res);
        }

      })
      error => {
        this.helper.dismissLoad();
        this.helper.presentToast(error);

        // this.errors = error
      }
    }




    // if(this.email!=null && this.password!=null){
    // console.log(this.email, this.password);
    // const result = await this.auth.auth.signInWithEmailAndPassword(this.email,this.password);
    // console.log(result)
    // this.navCtrl.navigateForward(['home']);
    // }
    // else{
    //   const alert = await this.alertCtrl.create({
    //     header: 'Alert',
    //     message: 'Enter the username and password',
    //     buttons: ['OK']
    //   });
    //   console.log("empty")
    //    alert.present();
    // }
  }

  validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
  register() {
   
    this.router.navigate(['/signup'])
  }
}

