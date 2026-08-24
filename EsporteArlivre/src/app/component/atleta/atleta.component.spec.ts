import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { AtletaServiceService } from '../../service/atleta-service.service';

describe('AtletaComponent', () => {
  let service: AtletaServiceService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        AtletaServiceService,
        provideHttpClient()
      ]
    })
    
    service = TestBed.inject(AtletaServiceService);
  });

  it('deve calcular a idade corretamente', () => {
    const resultado = service.calcularIdade('1976-05-05');
    expect(resultado).toBe(50); // Ajuste o valor esperado conforme o ano atual
  });
});
