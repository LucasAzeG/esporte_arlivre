import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CadastroCorridasComponent } from './cadastro-corridas.component';
import { CadastroCorridasService } from '../../service/cadastrocorrida.service';
import { Router, ActivatedRoute } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { of } from 'rxjs';

describe('CadastroCorridasComponent', () => {

  let component: CadastroCorridasComponent;
  let fixture: ComponentFixture<CadastroCorridasComponent>;

  let service: jasmine.SpyObj<CadastroCorridasService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {

    service = jasmine.createSpyObj('CadastroCorridasService', [
      'adicionarCadastroCorrida',
      'buscarPorId'
    ]);

    router = jasmine.createSpyObj('Router', [
      'navigate'
    ]);

    service.adicionarCadastroCorrida.and.returnValue(of(undefined));

    service.buscarPorId.and.returnValue(
      of({
        id: 1,
        descricaoCorrida: 'Corrida Teste',
        dataCorrida: '2026-11-15',
        distanciaDisponiveis: '10KM'
      })
    );

    await TestBed.configureTestingModule({
      imports: [
        CadastroCorridasComponent
      ],

      providers: [
        provideHttpClient(),

        {
          provide: CadastroCorridasService,
          useValue: service
        },

        {
          provide: Router,
          useValue: router
        },

        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: () => null
              }
            }
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CadastroCorridasComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });


  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });


  it('deve iniciar os campos vazios', () => {

    expect(component.descricaoCorrida).toBe('');
    expect(component.dataCorrida).toBe('');
    expect(component.distanciaDisponiveis).toBe('');

  });


  it('deve limpar os dados da corrida', () => {

    component.descricaoCorrida = 'Corrida Teste';
    component.dataCorrida = '2026-11-15';
    component.distanciaDisponiveis = '10KM';

    component.limparDados();

    expect(component.descricaoCorrida).toBe('');
    expect(component.dataCorrida).toBe('');
    expect(component.distanciaDisponiveis).toBe('');

  });


  it('deve enviar os dados corretos para o serviço', () => {

    component.descricaoCorrida = 'Corrida Teste';
    component.dataCorrida = '2026-11-15';
    component.distanciaDisponiveis = '10KM';

    component.salvar();

    expect(service.adicionarCadastroCorrida).toHaveBeenCalled();

    const corridaEnviada =
      service.adicionarCadastroCorrida.calls.mostRecent().args[0];

    expect(corridaEnviada.descricaoCorrida)
      .toBe('Corrida Teste');

    expect(corridaEnviada.dataCorrida)
      .toBe('2026-11-15');

    expect(corridaEnviada.distanciaDisponiveis)
      .toBe('10KM');

  });


  it('deve limpar os campos depois de salvar', () => {

    component.descricaoCorrida = 'Corrida Teste';
    component.dataCorrida = '2026-11-15';
    component.distanciaDisponiveis = '10KM';

    component.salvar();

    expect(component.descricaoCorrida).toBe('');
    expect(component.dataCorrida).toBe('');
    expect(component.distanciaDisponiveis).toBe('');

  });


  it('deve navegar para a lista de corridas depois de salvar', () => {

    component.descricaoCorrida = 'Corrida Teste';
    component.dataCorrida = '2026-11-15';
    component.distanciaDisponiveis = '10KM';

    component.salvar();

    expect(router.navigate)
      .toHaveBeenCalledWith(['/listaCorridas']);

  });


  it('deve salvar uma nova corrida', () => {

    component.descricaoCorrida = 'Corrida Teste';
    component.dataCorrida = '2026-11-15';
    component.distanciaDisponiveis = '25KM';

    component.salvar();

    expect(service.adicionarCadastroCorrida)
      .toHaveBeenCalledTimes(1);

  });

});