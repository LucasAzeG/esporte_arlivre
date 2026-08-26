import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';

import { ListaCorridasComponent } from './lista-corridas.component';
import { CadastroCorridasService } from '../../../service/cadastrocorrida.service';

describe('ListaCorridasComponent', () => {
  let component: ListaCorridasComponent;
  let fixture: ComponentFixture<ListaCorridasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaCorridasComponent],
      providers: [
        CadastroCorridasService,
        provideHttpClient(),
        provideRouter([])
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaCorridasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});