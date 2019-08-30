import { Component, OnInit } from '@angular/core';
import { LoadingController, AlertController, NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { ApiService } from '../services/api/api.service';
import { HelperService } from '../services/helper/helper.service';
import { AuthService } from '../services/auth/auth.service';
import { map, first } from 'rxjs/operators';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  username;
  email;
  password;
  rePassword;
  usernames;
  arrary = [];
  available;
  constructor(private auth: AuthService, private navCtrl: NavController,
    private firestore: AngularFirestore, private alertCtrl: AlertController, 
    private api: ApiService, private router: Router,
    private helper:HelperService,
    private loadingController:LoadingController
    ) { }
    passwordType: string = 'password';
    passwordIcon: string = 'eye-off';
  
 
  
    async ngOnInit() {
      await this.api.getUserNames().pipe(map(list => list.map(item => {
        let data = item.payload.doc.data();
        let id = item.payload.doc.id;
        return { data }
      }))).subscribe((res: any) => {
  
        this.usernames = res;
        for (let i = 0; i < this.usernames.length; i++) {
          this.arrary.push(this.usernames[i].data.username)
        }
  
        console.log(this.usernames)
      })
  
    }
    uName() {
      console.log(this.arrary)
      this.available = (this.arrary.indexOf(this.username.toLowerCase()) > -1);
      console.log(this.available)
    }
  
    async register() {
      // this.helper.presentLoading('');
      this.api.checkUserName(this.username).pipe(map(list => list.map(item => {
        let data = item.payload.doc.data();
        let id = item.payload.doc.id;
        return { data }
      })), first()).toPromise().then((res: any) => {
        console.log(res)
        if (res.length > 0) {
          // user exist
          // this.helper.dismissLoad();
          this.helper.presentToast('User Already Exist')
          console.log('User Already Exist')
        }
        else {
          try {
            if (this.username != null && this.email != null && this.password != null && this.available != true) {
              console.log(this.email, this.password);
              this.loadingController.create({
                message: 'Fetching Results',
                duration: 500
              }).then((res) => {
                res.present();
              });
              this.auth.signup(this.email, this.password).then((res: any) => {
                console.log(res)
                localStorage.setItem('userId',res.user.uid);
                if (res.user.uid) {
                  let data = {
                    username: this.username.toLowerCase(),
                    email: this.email,
                    password: this.password,
                    points:0
                  }
                  this.api.createUser(res.user.uid, data).then(resp => {
  
                    let data1 = {
                      username: this.username.toLowerCase()
                    }
                    this.api.createUsername(res.user.uid, data1).then(res => {
                      this.helper.dismissLoad();
                      this.helper.presentToast('User Created Successfully')
                      this.router.navigate(['/signin']);
                    })
                      .catch((error) => {
                        console.log(error);
  
                        // User couldn't sign in (bad verification code?)
                        this.helper.presentToast(error);
                        // this.helper.dismissLoad();
                        // ...
                      });
                  })
                    .catch((error) => {
                      console.log(error);
  
                      // User couldn't sign in (bad verification code?)
                      this.helper.presentToast(error);
                      // this.helper.dismissLoad();
                      // ...
                    });
                }
                else {
                  console.log('emial already exist')
                  alert("email Already Exist");
                  this.helper.presentToast("emial already exist");
                  // this.helper.dismissLoad();
                }
  
  
              })
                .catch((error) => {
                  console.log(error);
  
                  // User couldn't sign in (bad verification code?)
                  this.helper.presentToast(error);
                  // this.helper.dismissLoad();
                  // ...
                });
            }
            else {
              this.helper.presentToast("Fill all fields");
              // this.helper.dismissLoad();
            }
          } catch (error) {
            console.log(error)
            // this.helper.dismissLoad();
            this.helper.presentToast(error);
          }
        }
      })
  
    }
  
 

  
}
