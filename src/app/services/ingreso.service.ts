import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IngresoService {

  constructor(private firestore: AngularFirestore) { }

  agregarIngreso(ingreso: any): Promise<any>{ //para agregar a la coleccion empleados
    return this.firestore.collection('r_ingreso').add(ingreso)
  }
  getIngresos(): Observable<any>{ //retorna los datos de todos los items
    return this.firestore.collection('r_ingreso',ref => ref.orderBy('fechaCreacion','asc')).snapshotChanges(); //snapshot nos sirve para ver los cambios en tiempo real
  }
}
