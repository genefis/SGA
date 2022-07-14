import { FormControl } from '@angular/forms';
import { startWith, map, Observable } from 'rxjs';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
@Component({
  selector: 'app-equipment',
  templateUrl: './equipment.component.html',
  styleUrls: ['./equipment.component.css']
})

export class EquipmentComponent implements OnInit, AfterViewInit {

  searchControl = new FormControl('');
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions?: Observable<string[]>;
  arraAux: string[] = []
  //table
  displayedColumns: string[] = ['id', 'nombre', 'marca', 'categoria','n_equipos','departamento','descripcion'];
  dataSource = new MatTableDataSource<TableElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator?: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator!;
  }
  constructor() { }

  fetchData(){
    /*this.dataService.allData().subscribe(
      result=>{
        result.foreach(x=>{
          var aux:TableElement = {}
          aux.id=x.id
          aux.nombre=x.nombre
          -
          -
          -

          auxArray.push(aux)
        })
        this.dataSource = auxArray
      }
    )
    */
  }

  ngOnInit(): void {
    //fetchData()
    this.filteredOptions = this.searchControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

}
export interface TableElement {
  id?: string;
  nombre?: string;
  marca?: string;
  categoria?: string;
  n_equipos?: string;
  departamento?: string;
  descripcion?: string;
  color?: string
}

const ELEMENT_DATA: TableElement[] = [
  {id:'###',nombre:'Lorem',marca:'Lorem',categoria:'Lorem',n_equipos:'###',departamento:"Lorem",descripcion:"Lorem", color:'1'},
  {id:'###',nombre:'Lorem',marca:'Lorem',categoria:'Lorem',n_equipos:'###',departamento:"Lorem",descripcion:"Lorem", color:'2'},
  {id:'###',nombre:'Lorem',marca:'Lorem',categoria:'Lorem',n_equipos:'###',departamento:"Lorem",descripcion:"Lorem", color:'1'},
  {id:'###',nombre:'Lorem',marca:'Lorem',categoria:'Lorem',n_equipos:'###',departamento:"Lorem",descripcion:"Lorem", color:'2'},
  {id:'###',nombre:'Lorem',marca:'Lorem',categoria:'Lorem',n_equipos:'###',departamento:"Lorem",descripcion:"Lorem", color:'1'},
  {id:'###',nombre:'Lorem',marca:'Lorem',categoria:'Lorem',n_equipos:'###',departamento:"Lorem",descripcion:"Lorem", color:'2'},
  {id:'###',nombre:'Lorem',marca:'Lorem',categoria:'Lorem',n_equipos:'###',departamento:"Lorem",descripcion:"Lorem", color:'1'},
  {id:'###',nombre:'Lorem',marca:'Lorem',categoria:'Lorem',n_equipos:'###',departamento:"Lorem",descripcion:"Lorem", color:'2'},
  {id:'###',nombre:'Lorem',marca:'Lorem',categoria:'Lorem',n_equipos:'###',departamento:"Lorem",descripcion:"Lorem", color:'1'},
  {id:'###',nombre:'Lorem',marca:'Lorem',categoria:'Lorem',n_equipos:'###',departamento:"Lorem",descripcion:"Lorem", color:'2'},
  {id:'###',nombre:'Lorem',marca:'Lorem',categoria:'Lorem',n_equipos:'###',departamento:"Lorem",descripcion:"Lorem", color:'1'},
];
