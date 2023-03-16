import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { CarService } from 'src/app/Services/car.service';
import { PedidosService } from 'src/app/Services/pedidos.service';
import Swal from 'sweetalert2';
declare let alertify: any;

@Component({
  selector: 'app-carrito-compras',
  templateUrl: './carrito-compras.component.html',
  styleUrls: ['./carrito-compras.component.css']
})
export class CarritoComprasComponent implements OnInit {


  pedidoForm: FormGroup = this.fb.group({
    Tipo_Pago_NotaVenta: ['', Validators.required],
    Total_Pago_NotaVenta: [0, Validators.required],
    Direccion_NotaVenta: ['', Validators.required],
    user_id: [localStorage.getItem('user_id'), Validators.required],
    tipo_entrega__pedido_id: ['', Validators.required],
    detalles: [[], Validators.required],
  });

  cars: any[] = [];

  constructor(private car: CarService, private fb: FormBuilder,private spinner:NgxSpinnerService,private pedidoService:PedidosService) {
    this.cars = car.getCar();
  }
  ngOnInit(): void {
    this.countTotal();
  }


  incrementProduct(id: any, stock: number) {
    const input = document.getElementById(id) as HTMLInputElement;
    if (Number(input.value) < stock) input.value = (Number(input.value) + 1).toString();
  }

  decreaseProduct(id: any) {
    const input = document.getElementById(id) as HTMLInputElement;
    if (Number(input.value) > 0) input.value = (Number(input.value) - 1).toString();
  }

  maxvalue(id: any, maxStock: any) {
    const input = document.getElementById(id) as HTMLInputElement;
    console.log(id);
    if (maxStock < Number(input.value)) input.value = maxStock;
    input.focus();
  }

  addProducto(id: any) {
    const cantidad = Number((document.getElementById(id) as HTMLInputElement)?.value);
    if (cantidad > 0) {
      const index = this.cars.findIndex((p: any) => p.id === id);
      const foundProduct = this.cars.find(p => p.id === id);
      foundProduct.cantidad = cantidad;
      this.cars.splice(index, 1, foundProduct);
      this.car.setCar(this.cars);
      Swal.fire({ position: 'center', icon: 'success', title: 'Producto Actualizado', showConfirmButton: false, timer: 1000 });
    } else {
      const index = this.cars.findIndex((p: any) => p.id === id);
      this.cars.splice(index, 1);
      this.car.setCar(this.cars);
      Swal.fire({ position: 'center', icon: 'success', title: 'Producto Eliminado', showConfirmButton: false, timer: 1000 });
    }
    this.countTotal();
  }

  countTotal(){
    let total = 0;
    for (const iterator of this.cars) {
      total += iterator.cantidad * iterator.Precio_Producto;
    }
    this.pedidoForm.patchValue(
      {Total_Pago_NotaVenta:total}
    );
  }


  createPedido(){
    this.spinner.show();
    const detalles:any[]=[];
    for (const iterator of this.cars) {
      const detalle = {
        Cantidad_Productos: iterator.cantidad,
        Subtotal_Productos: iterator.cantidad * iterator.Precio_Producto,
        producto_id:iterator.id
      };
      detalles.push(detalle);
    }

    this.pedidoForm.patchValue({
      detalles:detalles
    });

    if (this.pedidoForm.value.tipo_entrega__pedido_id == 1) {
      this.pedidoForm.patchValue({
        Direccion_NotaVenta:'LOCAL'
      });
    }

    this.pedidoService.createPedido(this.pedidoForm.value).subscribe(
      result => {
        if (result.status) {
          Swal.fire({ position: 'center', icon: 'success', title: result.alert , confirmButtonColor:'green' });
          this.cars=[];
          this.car.setCar([]);
          this.pedidoForm.setValue(
            {
              Tipo_Pago_NotaVenta: '',
              Total_Pago_NotaVenta: 0,
              Direccion_NotaVenta: '',
              user_id: localStorage.getItem('user_id'),
              tipo_entrega__pedido_id: '',
              detalles: [],
            }
          );
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

  setCarrito(){
    this.cars=[];
    this.car.setCar([]);
    this.pedidoForm.setValue(
      {
        Tipo_Pago_NotaVenta: '',
        Total_Pago_NotaVenta: 0,
        Direccion_NotaVenta: '',
        user_id: localStorage.getItem('user_id'),
        tipo_entrega__pedido_id: '',
        detalles: [],
      }
    );
  }

}
