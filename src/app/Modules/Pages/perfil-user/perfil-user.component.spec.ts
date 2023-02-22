import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilUSerComponent } from './perfil-user.component';

describe('PerfilUSerComponent', () => {
  let component: PerfilUSerComponent;
  let fixture: ComponentFixture<PerfilUSerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerfilUSerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PerfilUSerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
