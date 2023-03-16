import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { MensajesService } from 'src/app/Services/mensajes.service';
import { UsuariosService } from 'src/app/Services/usuarios.service';
import Swal from 'sweetalert2';
declare let alertify: any;

@Component({
  selector: 'app-soporte-tecnico',
  templateUrl: './soporte-tecnico.component.html',
  styleUrls: ['./soporte-tecnico.component.css']
})
export class SoporteTecnicoComponent {


  userForm: FormGroup = this.fb.group({
    usuario_id: ['', Validators.required],
    nombre: ['', Validators.required],
    mensaje: ['', Validators.required]
  });


  constructor(private fb: FormBuilder,
    private usuarioService:UsuariosService,
    private spinner:NgxSpinnerService,
    private messegeServie:MensajesService,
    public dialogref: MatDialogRef<SoporteTecnicoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string) {
      this.getInfoUser();
  }


  getInfoUser(){
    this.spinner.show();
    this.usuarioService.getUsuario().subscribe(
      result=>{
        const user = {
          usuario_id:result.data.id,
          nombre: result.data.Nombre_Usuario,
          mensaje:''
        }
        this.userForm.setValue(user);
        this.spinner.hide();
      }
    );
  }

  sendMessege() {
    this.spinner.show();
    this.messegeServie.createMenssage(this.userForm.value).subscribe(
      result=>{
        if (result.status) {
          Swal.fire({ position: 'center', icon: 'success', title: result.alert , confirmButtonColor:'green' });
          this.dialogref.close();
        } else {
          Swal.fire({ icon: 'error', title: result.alert, confirmButtonColor: 'red', confirmButtonText: 'Cerrar' });
          if (result.messages.length !== 0) {
            for (let i = 0; i < result.messages.length; i++) {
              alertify.error(result.messages[i]);
            }
          }
        }
        this.spinner.hide();
      }
    );
  }


  close(){
    this.dialogref.close();
  }
}
