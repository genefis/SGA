import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { InventarioService } from '../../services/inventario.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css']
})
export class InventarioComponent implements OnInit {
  createItem:FormGroup; //variable para verificar formulario
  submited = false; // variable para enviar datos
  loading = false; //para el gif de carga
  id: string | null;
  titulo = 'Agregar Item';

  constructor(private fb: FormBuilder,
              private _inventarioService:InventarioService,
              private router: Router,
              private toastr: ToastrService,
              private aRoute: ActivatedRoute) { 
    this.createItem = this.fb.group({
      nombre: ['',Validators.required],
      categoria: ['',Validators.required],
      marca: ['',Validators.required],
      descripcion: ['',Validators.required],
      departamento: ['',Validators.required],
      n_equipos: ['',Validators.required]
    })
    this.id = this.aRoute.snapshot.paramMap.get('id')
  }

  ngOnInit(): void {
    this.esEditar();
  }
  agregarEditarItem(){
    this.submited = true;
    if (this.createItem.invalid) {
      return;
    }
    if(this.id === null){
      this.agregarItem();
    }else{
      this.editarItem(this.id);
    }
  }

  agregarItem(){
    const item: any ={ //se crea el item con los datos a enviar
      nombre: this.createItem.value.nombre,
      categoria: this.createItem.value.categoria,
      marca: this.createItem.value.marca,
      descripcion: this.createItem.value.descripcion,
      departamento: this.createItem.value.departamento,
      n_equipos: this.createItem.value.n_equipos,
      fechaCreacion: new Date(),
      fechaActualizacion: new Date()
    }
    this.loading = true;
    this._inventarioService.agregarItem(item).then(()=>{ // se valida la creacion 
      this.toastr.success('Se a registrado con éxito','Item Registrado',{
        positionClass: 'toast-bottom-right'
      })
      this.loading = false;
      this.router.navigate(['/list-inventario']) // despues de agregar manda al listado general
    }).catch(error =>{
      console.log(error);
    })

  }
  editarItem(id: string){
    
    const item: any ={ //se crea el empleado con los datos a enviar
      nombre: this.createItem.value.nombre,
      categoria: this.createItem.value.categoria,
      marca: this.createItem.value.marca,
      descripcion: this.createItem.value.descripcion,
      departamento: this.createItem.value.departamento,
      n_equipos: this.createItem.value.n_equipos,
      fechaActualizacion: new Date()
    }
    this.loading = true;
    this._inventarioService.actualizarItem(id,item).then(()=>{
      this.loading = false;
      this.toastr.info('El item fué actualizado con éxito','Item modificado',{
        positionClass:'toast-bottom-right'
      })
      this.router.navigate(['/list_inventario']);
    })
  }
  esEditar(){
    this.titulo = 'Editar Item' 
    if(this.id !== null){
      this.loading = true;
      this._inventarioService.getItem(this.id).subscribe(data =>{
        this.loading = false;
        console.log(data);
        this.createItem.setValue({
          nombre: data.payload.data()['nombre'],
          categoria: data.payload.data()['categoria'],
          marca: data.payload.data()['marca'],
          descripcion: data.payload.data()['descripcion'],
          departamento: data.payload.data()['departamento'],
          n_equipos: data.payload.data()['n_equipos'],
        })
      })
    }
  }



}
