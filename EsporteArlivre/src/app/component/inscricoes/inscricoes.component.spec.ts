import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { InscricoesComponent } from './inscricoes.component';

import { AtletaServiceService } from '../../service/atleta-service.service';
import { CadastroCorridasService } from '../../service/cadastrocorrida.service';

import { Atleta } from '../../models/Atleta';
import { CadastroCorrida } from '../../models/CadastroCorrida';


describe('InscricoesComponent', () => {

  let component: InscricoesComponent;
  let fixture: ComponentFixture<InscricoesComponent>;

  let atletaServiceSpy: jasmine.SpyObj<AtletaServiceService>;
  let corridaServiceSpy: jasmine.SpyObj<CadastroCorridasService>;


  beforeEach(async () => {

    atletaServiceSpy = jasmine.createSpyObj(
      'AtletaServiceService',
      ['listarAtletas']
    );

    corridaServiceSpy = jasmine.createSpyObj(
      'CadastroCorridasService',
      ['listarDescricaoCorrida']
    );


    const atletas: Atleta[] = [
      {
        id: 1,
        nome: 'João da Silva',
        cpf: '123.456.789-00',
        sexo: 'Masculino',
        cep: 12345678,
        ruaLogradouro: 'Rua Teste',
        bairro: 'Centro',
        cidade: 'São Paulo',
        uf: 'SP',
        dataNascimento: '1995-05-10'
      }
    ];


    const corridas: CadastroCorrida[] = [
      {
        id: 1,
        descricaoCorrida: 'Corrida Esporte ArLivre',
        dataCorrida: '2026-11-15',
        distanciaDisponiveis: '5km, 10km, 25km'
      }
    ];


    atletaServiceSpy.listarAtletas.and.returnValue(of(atletas));

    corridaServiceSpy.listarDescricaoCorrida.and.returnValue(of(corridas));


    await TestBed.configureTestingModule({

      imports: [
        InscricoesComponent
      ],

      providers: [

        {
          provide: AtletaServiceService,
          useValue: atletaServiceSpy
        },

        {
          provide: CadastroCorridasService,
          useValue: corridaServiceSpy
        }

      ]

    }).compileComponents();


    fixture = TestBed.createComponent(InscricoesComponent);

    component = fixture.componentInstance;

    fixture.detectChanges();

  });


  // =====================================================
  // TESTE 1
  // =====================================================

  it('deve criar o componente', () => {

    expect(component).toBeTruthy();

  });


  // =====================================================
  // TESTE 2
  // =====================================================

  it('deve carregar os atletas ao iniciar', () => {

    expect(atletaServiceSpy.listarAtletas)
      .toHaveBeenCalled();

    expect(component.atletas.length)
      .toBe(1);

    expect(component.atletas[0].nome)
      .toBe('João da Silva');

  });


  // =====================================================
  // TESTE 3
  // =====================================================

  it('deve carregar as corridas ao iniciar', () => {

    expect(corridaServiceSpy.listarDescricaoCorrida)
      .toHaveBeenCalled();

    expect(component.corridas.length)
      .toBe(1);

    expect(component.corridas[0].descricaoCorrida)
      .toBe('Corrida Esporte ArLivre');

  });


  // =====================================================
  // TESTE 4
  // =====================================================

  it('deve selecionar um atleta e calcular sua categoria', () => {

    const atleta = component.atletas[0];

    component.atletaSelecionado = atleta;

    component.selecionarAtleta();

    expect(component.categoria)
      .toContain('Geral Masculino');

  });


  // =====================================================
  // TESTE 5
  // =====================================================

  it('deve encontrar atleta pelo CPF', () => {

    component.cpfBusca = '12345678900';

    component.buscarPorCpf();

    expect(component.atletaSelecionado)
      .toBeTruthy();

    expect(component.atletaSelecionado?.nome)
      .toBe('João da Silva');

  });


  // =====================================================
  // TESTE 6
  // =====================================================

  it('não deve encontrar atleta com CPF inexistente', () => {

    component.cpfBusca = '99999999999';

    component.buscarPorCpf();

    expect(component.atletaSelecionado)
      .toBeNull();

    expect(component.categoria)
      .toBe('');

  });


  // =====================================================
  // TESTE 7
  // =====================================================

  it('deve retornar null quando o atleta não possui data de nascimento', () => {

    const atleta = {
      ...component.atletas[0],
      dataNascimento: ''
    };

    const idade = component.calcularIdade(atleta);

    expect(idade)
      .toBeNull();

  });


  // =====================================================
  // TESTE 8
  // =====================================================

  it('deve calcular a idade do atleta', () => {

    const atleta = component.atletas[0];

    const idade = component.calcularIdade(atleta);

    expect(idade)
      .toBeGreaterThan(0);

  });


  // =====================================================
  // TESTE 9
  // =====================================================

  it('deve calcular a categoria corretamente', () => {

    const atleta = component.atletas[0];

    const categoria = component.calcularCategoria(atleta);

    expect(categoria)
      .toContain('Geral Masculino');

    expect(categoria)
      .toContain('30-39 anos');

  });


  // =====================================================
  // TESTE 10
  // =====================================================

  it('deve definir R$ 69,90 para a distância de 5km', () => {

    component.distancia = '5km';

    component.escolherDistancia();

    expect(component.valorInscricao)
      .toBe(69.90);

  });


  // =====================================================
  // TESTE 11
  // =====================================================

  it('deve definir R$ 79,90 para a distância de 10km', () => {

    component.distancia = '10km';

    component.escolherDistancia();

    expect(component.valorInscricao)
      .toBe(79.90);

  });


  // =====================================================
  // TESTE 12
  // =====================================================

  it('deve definir R$ 89,90 para a distância de 25km', () => {

    component.distancia = '25km';

    component.escolherDistancia();

    expect(component.valorInscricao)
      .toBe(89.90);

  });


  // =====================================================
  // TESTE 13
  // =====================================================

  it('não deve finalizar inscrição sem atleta', () => {

    spyOn(window, 'alert');

    component.atletaSelecionado = null;

    component.finalizarInscricao();

    expect(window.alert)
      .toHaveBeenCalledWith('Selecione um atleta.');

  });


  // =====================================================
  // TESTE 14
  // =====================================================

  it('não deve finalizar inscrição sem corrida', () => {

    spyOn(window, 'alert');

    component.atletaSelecionado = component.atletas[0];

    component.corridaSelecionada = null;

    component.finalizarInscricao();

    expect(window.alert)
      .toHaveBeenCalledWith('Selecione uma corrida.');

  });


  // =====================================================
  // TESTE 15
  // =====================================================

  it('não deve finalizar inscrição sem distância', () => {

    spyOn(window, 'alert');

    component.atletaSelecionado = component.atletas[0];

    component.corridaSelecionada = component.corridas[0];

    component.distancia = '';

    component.finalizarInscricao();

    expect(window.alert)
      .toHaveBeenCalledWith('Selecione a distância da prova.');

  });


  // =====================================================
  // TESTE 16
  // =====================================================

  it('não deve finalizar inscrição sem tamanho de camiseta', () => {

    spyOn(window, 'alert');

    component.atletaSelecionado = component.atletas[0];

    component.corridaSelecionada = component.corridas[0];

    component.distancia = '5km';

    component.tamanhoCamiseta = '';

    component.finalizarInscricao();

    expect(window.alert)
      .toHaveBeenCalledWith('Selecione o tamanho da camiseta.');

  });


  // =====================================================
  // TESTE 17
  // =====================================================

  it('não deve finalizar inscrição sem aceitar os termos', () => {

    spyOn(window, 'alert');

    component.atletaSelecionado = component.atletas[0];

    component.corridaSelecionada = component.corridas[0];

    component.distancia = '5km';

    component.tamanhoCamiseta = 'M';

    component.termosAceitos = false;

    component.finalizarInscricao();

    expect(window.alert)
      .toHaveBeenCalledWith(
        'Você precisa aceitar os termos do regulamento.'
      );

  });


  // =====================================================
  // TESTE 18
  // =====================================================

  it('deve finalizar a inscrição quando todos os dados estiverem preenchidos', () => {

    spyOn(window, 'alert');

    component.atletaSelecionado = component.atletas[0];

    component.corridaSelecionada = component.corridas[0];

    component.distancia = '5km';

    component.tamanhoCamiseta = 'M';

    component.termosAceitos = true;

    component.escolherDistancia();

    component.finalizarInscricao();

    expect(window.alert)
      .toHaveBeenCalledWith(
        'Inscrição realizada com sucesso!'
      );

  });

});