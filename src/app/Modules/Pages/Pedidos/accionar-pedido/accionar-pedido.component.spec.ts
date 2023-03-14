import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccionarPedidoComponent } from './accionar-pedido.component';

describe('AccionarPedidoComponent', () => {
  let component: AccionarPedidoComponent;
  let fixture: ComponentFixture<AccionarPedidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccionarPedidoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccionarPedidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
