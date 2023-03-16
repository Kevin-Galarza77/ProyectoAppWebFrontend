import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoporteTecnicoTableComponent } from './soporte-tecnico-table.component';

describe('SoporteTecnicoTableComponent', () => {
  let component: SoporteTecnicoTableComponent;
  let fixture: ComponentFixture<SoporteTecnicoTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SoporteTecnicoTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SoporteTecnicoTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
