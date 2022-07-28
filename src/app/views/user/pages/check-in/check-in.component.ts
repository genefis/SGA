import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IngresoService } from '../../../../services/ingreso.service';

@Component({
  selector: 'app-check-in',
  templateUrl: './check-in.component.html',
  styleUrls: ['./check-in.component.css']
})
export class CheckInComponent implements OnInit {
  createIngreso:FormGroup; //variable para verificar formulario
  submited = false; // variable para enviar datos
  loading = false; //para el gif de carga
  id: string | null;

  constructor(
              private fb: FormBuilder,
              private _ingresoService:IngresoService,
              private router: Router,
              private toastr: ToastrService,
              private aRoute: ActivatedRoute
  ) {
    this.createIngreso = this.fb.group({
      cedula: ['',Validators.required],
      fecha: ['',Validators.required],
      hora: ['',Validators.required],

    })
    this.id = this.aRoute.snapshot.paramMap.get('id')
   }

  ngOnInit(): void {
  }
  agregarIngreso(){
    const ingreso: any ={ //se crea el item con los datos a enviar
      cedula: this.createIngreso.value.cedula,
      fecha: this.createIngreso.value.fecha,
      hora: this.createIngreso.value.hora,
    }
    this.loading = true;
    this._ingresoService.agregarIngreso(ingreso).then(()=>{ // se valida la creacion 
      this.toastr.success('Se a registrado con éxito','Ingreso Registrado',{
        positionClass: 'toast-bottom-right'
      })
      this.loading = false;
      this.router.navigate(['/user/ingreso']) // despues de agregar manda al listado general
    }).catch(error =>{
      console.log(error);
    })

  }

}
