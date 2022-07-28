import { CheckOutComponent } from './views/user/pages/check-out/check-out.component';
import { CheckInComponent } from './views/user/pages/check-in/check-in.component';
import { RegisterScheduleComponent } from './views/user/pages/register-schedule/register-schedule.component';
import { NgModule } from '@angular/core';
import { Routes,RouterModule } from '@angular/router';
import { LoginComponent } from './views/login/login.component';
import { RegisterMainComponent } from './views/user/pages/register-main/register-main.component';
import { UserComponent } from './views/user/user.component';
import { AdminComponent } from './views/admin/admin.component';
import { EquipmentComponent } from './views/admin/pages/equipment/equipment.component';
import { RegistrarUsuarioComponent } from './views/registrar-usuario/registrar-usuario.component';
import { VerificarCorreoComponent } from './views/verificar-correo/verificar-correo.component';
import { RecuperarPasswordComponent } from './views/recuperar-password/recuperar-password.component';
import { DashboardAComponent } from './views/dashboard-a/dashboard-a.component';
import { InventarioComponent } from './views/inventario/inventario.component';
import { ListInventarioComponent } from './views/list-inventario/list-inventario.component';

const routes: Routes=[
  {
    path:'',redirectTo:'login', pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'registrar-usuario',
    component: RegistrarUsuarioComponent
  },
  {
    path: 'verificar-correo',
    component: VerificarCorreoComponent
  },
  {
    path: 'recuperar-password',
    component: RecuperarPasswordComponent
  },
  {
    path: 'dashboard-a',
    component: DashboardAComponent
  },
  {
    path: 'inventario',
    component: InventarioComponent
  },
  {
    path: 'edit-inventario/:id',
    component: InventarioComponent
  },
  {
    path: 'list-inventario',
    component: ListInventarioComponent
  },
  {
    path: 'admin/equipment',
    component: EquipmentComponent
  },
  {
    path: 'admin',
    component:AdminComponent,
    children:[
      {
        path: '',
        redirectTo: 'equipment',
        pathMatch:'full'
      },
      {
        path:'equipment',
        component: EquipmentComponent
      }
    ]
  },
  {
    path:'user',
    component: UserComponent,
    children:[
      {
        path:'',
        redirectTo:'menu-registro',
        pathMatch:'full'
      },
      {
        path:'menu-registro',
        component: RegisterMainComponent,
      },
      {
        path:'registro-horario',
        component: RegisterScheduleComponent
      },
      {
        path:'ingreso',
        component:CheckInComponent
      },
      {
        path:'salida',
        component: CheckOutComponent
      }
    ]
  },
  {
    path:'**',redirectTo:'login', pathMatch: 'full'
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
