import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLogged = false;
  userToken: string | null = null;
  
    constructor(private _firebaseAuth: AngularFireAuth) {
      // Check if the user is already signed in
      this._firebaseAuth.currentUser.then(user => {
        if (user) {
          user.getIdToken().then(token => {
            this.userToken = token;
          });
        }
      });
  
      // Listen for changes in the user's authentication state
      this._firebaseAuth.authState.subscribe(user => {
        if (!user) {
          this.userToken = null;
        }
      });
    }
  
    signIn(email: string, password: string) {
      return this._firebaseAuth.signInWithEmailAndPassword(email, password).then(() => {
        console.log('Sign-in successful');
        localStorage.setItem('email', email);
        localStorage.setItem('password', password);
        // Set token
        this._firebaseAuth.currentUser.then(user => {
          user?.getIdToken().then(token => {
            this.userToken = token;
          });
        });
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
        this.userToken = null;
      }).catch((error) => {
        console.error(error);
      });
    }
  
    getToken() {
      return this.userToken ?? '';
    }
  }


