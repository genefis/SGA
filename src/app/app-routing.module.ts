import { CheckOutComponent } from './views/user/pages/check-out/check-out.component';
import { CheckInComponent } from './views/user/pages/check-in/check-in.component';
import { RegisterScheduleComponent } from './views/user/pages/register-schedule/register-schedule.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './views/login/login.component';
import { RegisterMainComponent } from './views/user/pages/register-main/register-main.component';
import { UserComponent } from './views/user/user.component';
import { AdminComponent } from './views/admin/admin.component';
import { EquipmentComponent } from './views/admin/pages/equipment/equipment.component';

const routes: Routes=[
  {
    path: '',
    redirectTo: 'login',
    pathMatch:'full'
  },
  {
    path: 'login',
    component: LoginComponent
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
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
