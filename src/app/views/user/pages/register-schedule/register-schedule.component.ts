import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HorarioService } from '../../../../services/horario.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register-schedule',
  templateUrl: './register-schedule.component.html',
  styleUrls: ['./register-schedule.component.css']
})
export class RegisterScheduleComponent implements OnInit {
  createHorario:FormGroup; //variable para verificar formulario
  submited = false; // variable para enviar datos
  loading = false; //para el gif de carga
  id: string | null;

  constructor(
    private fb: FormBuilder,
    private _horarioService:HorarioService,
    private router: Router,
    private toastr: ToastrService,
    private aRoute: ActivatedRoute
  ) {
    this.createHorario = this.fb.group({
      cedula: ['',Validators.required],
      Lunes: ['',Validators.required],
      ingresoL: ['',Validators.required],
      salidaL: ['',Validators.required],
      Martes: ['',Validators.required],
      ingresoM: ['',Validators.required],
      salidaM: ['',Validators.required],
      Miercoles: ['',Validators.required],
      ingresoMi: ['',Validators.required],
      salidaMi: ['',Validators.required],
      Jueves: ['',Validators.required],
      ingresoJ: ['',Validators.required],
      salidaJ: ['',Validators.required],
      Viernes: ['',Validators.required],
      ingresoV: ['',Validators.required],
      salidaV: ['',Validators.required],
      Sábado: ['',Validators.required],
      ingresoS: ['',Validators.required],
      salidaS: ['',Validators.required]
    })
    this.id = this.aRoute.snapshot.paramMap.get('id')
   }

  ngOnInit(): void {
  }
  agregarHorario(){
    const horario: any ={ //se crea el item con los datos a enviar
      cedula: this.createHorario.value.cedula,
      Lunes:[
        this.createHorario.value.ingresoL,
        this.createHorario.value.salidaL,
      ],
      Martes:[
        this.createHorario.value.ingresoM,
        this.createHorario.value.salidaM,
      ],
      Miercoles:[
        this.createHorario.value.ingresoMi,
        this.createHorario.value.salidaMi,
      ],

      Jueves:[
        this.createHorario.value.ingresoJ,
        this.createHorario.value.salidaJ,
      ],
      Viernes:[
        this.createHorario.value.ingresoV,
        this.createHorario.value.salidaV,
      ],

      Sábado:[
        this.createHorario.value.ingresoS,
        this.createHorario.value.salidaS,
      ],

      fechaCreacion: new Date()
    }
    this.loading = true;
    this._horarioService.agregarHorario(horario).then(()=>{ // se valida la creacion 
      this.toastr.success('Se a registrado con éxito','Horario Registrado',{
        positionClass: 'toast-bottom-right'
      })
      this.loading = false;
      this.router.navigate(['/user/ingreso']) // despues de agregar manda al listado general
    }).catch(error =>{
      console.log(error);
    })

  }

}
