import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AtletaComponent } from '../atleta.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { AtletaServiceService } from '../../../service/atleta-service.service';
import { Atleta } from '../../../models/Atleta';

describe('AtletaComponent', () => {
  let component: AtletaComponent;
  let fixture: ComponentFixture<AtletaComponent>;
  let httpMock: HttpTestingController;

  // Mock de dados com "id" numérico conforme a model Atleta
  const atletasMock: Atleta[] = [
    {
      id: 1,
      nome: 'Atleta Um',
      cpf: 12345678900,
      sexo: 'M',
      cep: 49000000,
      ruaLogradouro: 'Rua A',
      bairro: 'Centro',
      cidade: 'Aracaju',
      uf: 'SE',
      dataNascimento: '1995-10-10'
    },
    {
      id: 2,
      nome: 'Atleta Dois',
      cpf: 98765432100,
      sexo: 'F',
      cep: 49000000,
      ruaLogradouro: 'Rua B',
      bairro: 'Jardins',
      cidade: 'Aracaju',
      uf: 'SE',
      dataNascimento: '2000-01-01'
    }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AtletaComponent],
      providers: [
        AtletaServiceService,
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([])
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AtletaComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve calcular a idade corretamente', () => {
    component.dataNascimento = '2000-01-01';
    expect(component.calcularIdade()).toBe(26);
  });
});