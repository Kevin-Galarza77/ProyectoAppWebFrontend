import { Component , Inject} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { AuthService } from '../../Auth/Services/auth.service';
declare let alertify: any;
@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {

  userForm: FormGroup = this.fb.group({
    oldPasword: ['', Validators.required],
    newpassword: ['', Validators.required],
    repeat_password: ['', Validators.required]
  });
  hide: boolean = true;

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    public dialogref: MatDialogRef<ChangePasswordComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string,
    private authService:AuthService
  ) {

  }

  close(){
    this.dialogref.close()
  }
  
  changePassword(){
    this.authService.changePassword(this.userForm.value).subscribe(
      result=>{
        if (result.status) {
          Swal.fire({ position: 'center', icon: 'success', title: result.alert, confirmButtonColor:'green' });
          this.close();
        }else{
          Swal.fire({ icon: 'error', title: result.alert, confirmButtonColor: 'red', confirmButtonText: 'Cerrar' });
          if (result.messages.length !== 0) {
            for (let i = 0; i < result.messages.length; i++) {
              alertify.error(result.messages[i]);
            }
          }
        }
      }
    )
  }

}
