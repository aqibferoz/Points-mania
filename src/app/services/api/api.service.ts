import { Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore";
import { firestore } from 'firebase';
import{HttpClient}from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class ApiService {
order={
  cart:[],
  customerId:'',
  customerUserName:'',
  totalAmount:0,
  customerEmail:'',
  type:'',
  firstName:'',
  lastName:'',
  address:'',
  phoneNumber:0,
  currency:'',
  country:'',
  city:'',
  postCode:0,
  charges:0,
  chargesName:''


}
gameOrder={
  cart:[],
  customerId:'',
  customerUserName:'',
  totalAmount:0,
  customerEmail:'',
  firstName:'',
  lastName:'',
  phoneNumber:'',
  currency:'',
  charges:0,
  chargesName:''


}
user_country;
user_currency;
currency_value;
  constructor(private afs:AngularFirestore,private http:HttpClient) { }
  createUser(id, data){
    return this.afs.doc('users/' + id).set(data);
  }
  createUsername(id,data){
    return this.afs.doc('usernames/'+id).set(data);
  }
  getUserNames(){
    return this.afs.collection('usernames').snapshotChanges();
  }
  checkUserName(data){
    return this.afs.collection('usernames',ref=>ref.where('username','==',data)).snapshotChanges();
  }
  checkUser(data){
    return this.afs.collection('users',ref=>ref.where('username','==',data)).snapshotChanges();
  }
  updateUser(id,data){
    return this.afs.collection('users/').doc(id).update(data);
  }
  getUser(id){
    return this.afs.doc('users/'+id).valueChanges();
  }
  getGames(){
    return this.afs.collection('games',ref=>ref.where('catagory','==','game')).snapshotChanges();
  }
  getSingleGame(id){
    return this.afs.doc('games/'+id).valueChanges();
  }
  getSingleProduct(id){
    return this.afs.doc('products/'+id).valueChanges();
  }
  getProducts(){
    return this.afs.collection('products').snapshotChanges();
  }
  getPlayCards(){
    return this.afs.collection('games',ref=>ref.where('catagory','==','playcards')).snapshotChanges();
  }
  placeOrder(data){
    return this.afs.collection('orders').add(data);
  }
  convertCurrency(manual){
    return this.http.get('https://free.currconv.com/api/v7/convert?q=USD_'+manual+'&compact=ultra&apiKey=036b851e8f787316c9df');
  }
  createOrder(data){
    return this.afs.collection('orders').add(data);
  }
  getOrders(userid){

    return this.afs.collection('orders',ref=>ref.where('customerId','==',userid)).snapshotChanges();
  }
}

