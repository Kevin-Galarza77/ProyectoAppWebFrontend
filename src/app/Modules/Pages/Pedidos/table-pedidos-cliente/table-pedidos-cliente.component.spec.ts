import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablePedidosClienteComponent } from './table-pedidos-cliente.component';

describe('TablePedidosClienteComponent', () => {
  let component: TablePedidosClienteComponent;
  let fixture: ComponentFixture<TablePedidosClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablePedidosClienteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TablePedidosClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
