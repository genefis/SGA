import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FirebaseCodeErrorService } from 'app/services/firebase-code-error.service';
import * as firebase from 'firebase/compat';
import { getAuth, signInWithPopup, OAuthProvider} from "firebase/auth";


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
    private toastr: ToastrService,
    private router: Router,
    private firebaseError: FirebaseCodeErrorService
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
      this.toastr.error(this.firebaseError.codeError(error.code), 'Error');
    })
  }
  microsoftSignin(){
    const auth = getAuth();
    const provider = new OAuthProvider('microsoft.com');
    signInWithPopup(auth, provider).then((result)=>{
      if(result.user?.emailVerified) {
        this.router.navigate(['/user/ingreso']);
      } else {
        this.router.navigate(['/registrar-usuario']);
      }
    }).catch(err=>{
      console.log(err);
    })

    
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
