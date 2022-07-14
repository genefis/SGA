import { AppRoutingModule } from './app-routing.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from '@angular/fire/compat';
import { AppComponent } from './app.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { UsuarioService } from './usuario.service';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { LoginComponent } from './views/login/login.component';
import { UserComponent } from './views/user/user.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/material/material.module';
import { RegisterMainComponent } from './views/user/pages/register-main/register-main.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RegisterScheduleComponent } from './views/user/pages/register-schedule/register-schedule.component';
import { CheckInComponent } from './views/user/pages/check-in/check-in.component';
import { CheckOutComponent } from './views/user/pages/check-out/check-out.component';
import { AdminComponent } from './views/admin/admin.component';
import { EquipmentComponent } from './views/admin/pages/equipment/equipment.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    UsuariosComponent,
    FooterComponent,
    LoginComponent,
    UserComponent,
    RegisterMainComponent,
    RegisterScheduleComponent,
    CheckInComponent,
    CheckOutComponent,
    AdminComponent,
    EquipmentComponent,

  ],
  imports: [
    BrowserModule,
    MaterialModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    BrowserAnimationsModule
  ],
  providers: [UsuarioService],
  bootstrap: [AppComponent]
})
export class AppModule { }
