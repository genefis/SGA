import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InventarioService {

  constructor(private firestore: AngularFirestore) { }

  agregarItem(item: any): Promise<any>{ //para agregar a la coleccion empleados
    return this.firestore.collection('inventario').add(item)
  }
  getItems(): Observable<any>{ //retorna los datos de todos los items
    return this.firestore.collection('inventario',ref => ref.orderBy('fechaCreacion','asc')).snapshotChanges(); //snapshot nos sirve para ver los cambios en tiempo real
  }
  eliminarItem(id: string): Promise<any>{
    return this.firestore.collection('inventario').doc(id).delete();
  }
  getItem(id: string): Observable<any>{ //retorna datos de un item en especifico
    return this.firestore.collection('inventario').doc(id).snapshotChanges();
  }
  actualizarItem(id:string, data:any): Promise <any>{
    return this.firestore.collection('inventario').doc(id).update(data);
  }
}
