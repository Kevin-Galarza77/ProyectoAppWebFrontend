import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableSubCategoriaComponent } from './table-sub-categoria.component';

describe('TableSubCategoriaComponent', () => {
  let component: TableSubCategoriaComponent;
  let fixture: ComponentFixture<TableSubCategoriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableSubCategoriaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableSubCategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
