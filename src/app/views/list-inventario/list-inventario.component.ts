import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { InventarioService } from '../../services/inventario.service';

@Component({
  selector: 'app-list-inventario',
  templateUrl: './list-inventario.component.html',
  styleUrls: ['./list-inventario.component.css']
})
export class ListInventarioComponent implements OnInit {
  items: any[] = [];

  constructor(private _inventarioService: InventarioService,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getItems();
  }

  getItems(){
    this._inventarioService.getItems().subscribe(data =>{
      this.items = [];
      data.forEach((element:any) => {
       //console.log(element.payload.doc.data());
       this.items.push({
        id: element.payload.doc.id,
        ...element.payload.doc.data()
       })
      });
      console.log(this.items);
    })
  }
  eliminarItem(id: string){
    this._inventarioService.eliminarItem(id).then(()=>{
      console.log('item eliminado');
      this.toastr.error('Item eliminado','Registro Eliminado',{
        positionClass:'toast-bottom-right'
      });
    }).catch(error =>{
      console.log(error);
    })
  }
}
