import { AfterViewInit, Component, Inject, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { CategoriasService } from 'src/app/Services/categorias.service';
import { MensajesService } from 'src/app/Services/mensajes.service';
import Swal from 'sweetalert2';
declare let alertify: any;

@Component({
  selector: 'app-soporte-tecnico-table',
  templateUrl: './soporte-tecnico-table.component.html',
  styleUrls: ['./soporte-tecnico-table.component.css']
})
export class SoporteTecnicoTableComponent implements AfterViewInit {
  
  displayedColumns: string[] = ['Usuario', 'Mensaje'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  reportes: any[] = [];

  constructor(private mensajeService: MensajesService,private spinner:NgxSpinnerService,
    public dialogref: MatDialogRef<SoporteTecnicoTableComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string) {
    this.dataSource = new MatTableDataSource(this.reportes);
    this.getAllReportes();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  getAllReportes(){
    this.spinner.show();
    this.mensajeService.getAllMenssage().subscribe(
      result=>{
        this.reportes = result;
        this.dataSource = new MatTableDataSource(this.reportes);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.spinner.hide();
      },
      (error) => {
        console.log(error);
        this.spinner.hide();
        Swal.fire({ position: 'center', icon: 'error', title: "Se ha producido un error", confirmButtonColor: 'rgb(220,53,69)' });
      }
    );
  }

  close(){
    this.dialogref.close();
  }

}

