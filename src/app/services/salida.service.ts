import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SalidaService {

  constructor(private firestore: AngularFirestore) { 

  }
  agregarSalida(salida: any): Promise<any>{ //para agregar a la coleccion empleados
    return this.firestore.collection('r_salida').add(salida)
  }
  getSalidas(): Observable<any>{ //retorna los datos de todos los items
    return this.firestore.collection('r_salida',ref => ref.orderBy('fecha','asc')).snapshotChanges(); //snapshot nos sirve para ver los cambios en tiempo real
  }
}
