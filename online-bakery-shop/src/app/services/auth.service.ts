import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLogged = false;

  constructor( public _firebaseAuth: AngularFireAuth) { }

  signIn(email: string, password: string) {
    return this._firebaseAuth.signInWithEmailAndPassword(email, password).then(() => {
      console.log('Sign-in successful');
      localStorage.setItem('email', email);
      localStorage.setItem('password', password);
      this.isLogged = true;
      })
      .catch((error) => {
      console.error(error);
      });
  }

  
  register(email: string, password: string) {
    this._firebaseAuth.createUserWithEmailAndPassword(email, password)
      .then(() => {
        console.log('Registration successful');
        localStorage.setItem('email', email);
        localStorage.setItem('password', password);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  logout(){
    this._firebaseAuth.signOut().then(() => {
      localStorage.removeItem('email');
      localStorage.removeItem('password');
    }).catch((error) => {
      console.error(error);
    });
  }

}
