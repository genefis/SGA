import { AppRouterModule } from './footer/app-router.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from '@angular/fire/compat';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { FooterComponent } from './footer/footer.component';
import { UsuarioService } from './usuario.service';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    UsuariosComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRouterModule, 
    AngularFireModule.initializeApp(environment.firebase),

    provideFirebaseApp(() => initializeApp(environment.firebase)),
     provideAuth(() => getAuth()), 
     provideFirestore(() => getFirestore())
  ],
  providers: [UsuarioService],
  bootstrap: [AppComponent]
})
export class AppModule { }
