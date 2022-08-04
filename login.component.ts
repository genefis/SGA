import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { getAuth, signInWithPopup, OAuthProvider} from "firebase/auth";
import firebase from 'firebase/compat/app'
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginUsuario: FormGroup;
  loading: boolean = false;
  constructor(
    private fb: FormBuilder,
    private afAuth: AngularFireAuth,
    private router: Router,
    private db: AngularFirestore

  ) {
    this.loginUsuario = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    })
   }

  ngOnInit(): void {}

  login() {
    const email = this.loginUsuario.value.email;
    const password = this.loginUsuario.value.password;
    this.loading = true;
    this.afAuth.signInWithEmailAndPassword(email, password).then((user) => {
      if(user.user?.emailVerified) {
        this.router.navigate(['/user/menu-registro']);
      } else {
        this.router.navigate(['/verificar-correo']);
      }
    }).catch((error) => {
      this.loading = false;
      
    })
  }
  microsoftSignin(){
    const provider = new firebase.auth.OAuthProvider("microsoft.com");
    provider.setCustomParameters({
      clientId: "7aea2687-ef20-4dd2-8d8f-62b00e9e676b",
      tenant:"e87ded9c-7ff2-49b2-97fd-26279c66e8d4"
    });
    provider.addScope("user.read");
    provider.addScope("openid");
    provider.addScope("profile");
    provider.addScope("mail.send");
    this.afAuth.signInWithPopup(provider).then(data=>{
      if (data.additionalUserInfo?.isNewUser === true) {
        this.SetUserData(data)
        console.log(data)
        this.router.navigate(['/user/menu-registro'])
      }
      console.log(data)
      this.router.navigate(['/user/menu-registro'])
      console.log(data)
      /* new_user.mail = data.user?.email!
      new_user.name = data.user?.displayName!
      new_user.uid = data.user. */
    }).catch(err=>{
      console.log(err)
    });

  }
  SetUserData(result:any) {

    const mail = result.additionalUserInfo.profile.userPrincipalName
/*     var rol = 'nlejJDmY9jXMxvMPzBEN'
    if(this.tutors.includes(mail)){
      rol = '5d57QHCnw2CG1SNuW89D'
    } */
    const userRef: AngularFirestoreDocument<any> = this.db.doc(
      `users/${mail}`
    );
    return userRef.set(
      {
        uuid: result.user.uid,
        ...result.additionalUserInfo.profile,
      },
      {
        merge: true,
      }
    );
  }
  /*microsoftSignIn(): void {
    this.microsoft.singIn().then( async result => {

      if (result.additionalUserInfo.isNewUser) {
        const email: string = result.user.email;
        const username: string = email.split('@')[0];

        const newUser: User = {
          id: username,
          username,
          displayName: result.additionalUserInfo.profile['displayName'],
          email,
          photoURL: 'https://ui-avatars.com/api/?background=random&name=' +
            result.additionalUserInfo.profile['givenName'] +
            '+' +
            result.additionalUserInfo.profile['surname'],
          provider: result.additionalUserInfo.providerId,
          uid: result.additionalUserInfo.profile['id'],
          points: 0,
        };

        await this.userService.userDocument(email).set(newUser);

        const isAdmin = false;
        const isStudent = false;

        const userClaims: UserClaims = {
          isStudent,
          isAdmin,
        };
        await this.userService.claimsDocument(email).set(userClaims);
      }

      await this.router.navigate(['/course']).then(
        success => {
          this.Toast.fire({
            icon: 'success',
            title: 'Has iniciado sesión existosamente'
          });
        },
        error => {
          this.Toast.fire({
            icon: 'error',
            title: 'Ha ocurrido un problema'
          })
        }
      );
    });
  }

*/

}
