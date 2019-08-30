import { Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore";
import { firestore } from 'firebase';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private afs:AngularFirestore) { }
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
}
