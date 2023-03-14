import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablePedidosAdminComponent } from './table-pedidos-admin.component';

describe('TablePedidosAdminComponent', () => {
  let component: TablePedidosAdminComponent;
  let fixture: ComponentFixture<TablePedidosAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablePedidosAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TablePedidosAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
