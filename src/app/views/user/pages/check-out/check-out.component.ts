import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SalidaService } from '../../../../services/salida.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit {
  createSalida:FormGroup; //variable para verificar formulario
  submited = false; // variable para enviar datos
  loading = false; //para el gif de carga
  id: string | null;

  constructor(
    private fb: FormBuilder,
    private _salidaService:SalidaService,
    private router: Router,
    private toastr: ToastrService,
    private aRoute: ActivatedRoute

  ) { 
    this.createSalida = this.fb.group({
      cedula: ['',Validators.required],
      fecha: ['',Validators.required],
      hora: ['',Validators.required]

    })
    this.id = this.aRoute.snapshot.paramMap.get('id')
  }

  ngOnInit(): void {
  }

  agregarSalida(){
    const salida: any ={ //se crea el  con los datos a enviar
      cedula: this.createSalida.value.cedula,
      fecha: this.createSalida.value.fecha,
      hora: this.createSalida.value.hora,
    }
    this.loading = true;
    this._salidaService.agregarSalida(salida).then(()=>{ // se valida la creacion 
      this.toastr.success('Se a registrado con éxito','Salida Registrada',{
        positionClass: 'toast-bottom-right'
      })
      this.loading = false;
      this.router.navigate(['/user/salida']) // despues de agregar manda al listado general
    }).catch(error =>{
      console.log(error);
    })
  }
}
