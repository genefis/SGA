import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  constructor() { }

  ngOnInit(): void {}
  get email(){
    return this.loginForm.get('email')
  }


  get password(){
    return this.loginForm.get('email')
  }

  submit() {
    if (!this.loginForm.valid) {
      return;
    }
    const { email, password } = this.loginForm.value;
    //a continuacion insertar el authService para login
    /*
    this.authService.login(email, password).pipe(
      this.toast.observe({
        success: 'Ha iniciado sesión con exito',
        loading: 'Iniciando sesion...',
        error: `Ha ocurrido un error`
      })
    ).subscribe(() => {
    });
    */
  }
}
