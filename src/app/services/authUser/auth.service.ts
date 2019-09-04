import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { User } from 'src/app/userModel/user';
import { switchMap, first } from 'rxjs/operators';
import { auth } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$:Observable<User>

  constructor(private afAuth: AngularFireAuth,
    private afs:AngularFirestore,
    private router: Router) {

      //Get the state auth state of the user, then Fetch the Firestore user doc or retun Null
      this.user$ = this.afAuth.authState.pipe(
        switchMap(user =>{
          // Logged In
          if(user){
            return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
          } else {
            //Logged Out
            return of(null)
          }
        })
      )}

      async googleSignin() {
        const provider = new auth.GoogleAuthProvider();
        const credential = await this.afAuth.auth.signInWithPopup(provider);
        return this.updateUserData(credential.user);
      }
    
      private updateUserData(user) {
        // Sets user data to firestore on login
        const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);
    
        const data = { 
          uid: user.uid, 
          email: user.email, 
          displayName: user.displayName, 
          photoURL: user.photoURL
        } 
    
        return userRef.set(data, { merge: true })
    
      }
    
      async signOut() {
        await this.afAuth.auth.signOut();
        this.router.navigate(['/']);
      }

      async getUser() {
        return this.afAuth.authState.pipe(first()).toPromise();
      }
}
