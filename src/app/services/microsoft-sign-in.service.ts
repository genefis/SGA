import { Injectable } from '@angular/core';
import { getAuth, OAuthProvider } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import * as firebase from 'firebase/compat';

@Injectable({
  providedIn: 'root'
})
export class MicrosoftSignInService {

  constructor(public afAuth: AngularFireAuth) { }
  singIn(){
    const auth = getAuth();
    const microsoftProvider = new OAuthProvider('microsoft.com');
    microsoftProvider.setCustomParameters({
      tenant: '6eeb49aa-436d-43e6-becd-bbdf79e5077d'
    });
    microsoftProvider.addScope('user.read');
    microsoftProvider.addScope('openid');
    microsoftProvider.addScope('profile');
    microsoftProvider.addScope('mail.send');
    return this.afAuth.signInWithPopup(microsoftProvider);
  }
}
