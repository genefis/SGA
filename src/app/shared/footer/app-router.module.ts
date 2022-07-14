import { UsuariosComponent } from './../usuarios/usuarios.component';
import { RouterModule,Routes } from "@angular/router";
import { NgModule } from '@angular/core';
// route
const routes:Routes=[
    {path:'',component:UsuariosComponent},
    {path:'usuarios',component:UsuariosComponent}
    
]  
@NgModule({
    imports:[RouterModule.forRoot(routes)],
    exports:[RouterModule]
})

export class AppRouterModule{
    }