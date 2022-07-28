import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HorarioService {

  constructor(private firestore: AngularFirestore) { }

  agregarHorario(horario: any): Promise<any>{ //para agregar a la coleccion horario
    return this.firestore.collection('horario').add(horario)
  }
  getHorarios(): Observable<any>{ //retorna los datos de todos los horarios
    return this.firestore.collection('horario',ref => ref.orderBy('fecha','asc')).snapshotChanges(); //snapshot nos sirve para ver los cambios en tiempo real
  }
}
