import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSubCategoriaComponent } from './form-sub-categoria.component';

describe('FormSubCategoriaComponent', () => {
  let component: FormSubCategoriaComponent;
  let fixture: ComponentFixture<FormSubCategoriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormSubCategoriaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormSubCategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
