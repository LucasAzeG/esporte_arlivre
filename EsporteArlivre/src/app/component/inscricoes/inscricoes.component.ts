import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AtletaServiceService } from '../../service/atleta-service.service';
import { CadastroCorridasService } from '../../service/cadastrocorrida.service';

import { Atleta } from '../../models/Atleta';
import { CadastroCorrida } from '../../models/CadastroCorrida';

@Component({
  selector: 'app-inscricoes',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './inscricoes.component.html',
  styleUrl: './inscricoes.component.css'
})
export class InscricoesComponent implements OnInit {

  atletas: Atleta[] = [];
  corridas: CadastroCorrida[] = [];

  atletaSelecionado: Atleta | null = null;
  corridaSelecionada: CadastroCorrida | null = null;

  cpfBusca: string = '';

  distancia: string = '';
  tamanhoCamiseta: string = '';
  categoria: string = '';

  valorInscricao: number = 0;

  termosAceitos: boolean = false;

  constructor(
    private atletaService: AtletaServiceService,
    private cadastroCorridasService: CadastroCorridasService
  ) {}

  ngOnInit(): void {
    this.carregarAtletas();
    this.carregarCorridas();
  }

  carregarAtletas(): void {

    this.atletaService.listarAtletas().subscribe({
      next: (dados) => {
        this.atletas = dados;

        console.log('Atletas carregados:', this.atletas);
      },

      error: (erro) => {
        console.log('Erro ao carregar atletas:', erro);
      }
    });

  }

  carregarCorridas(): void {

    this.cadastroCorridasService.listarDescricaoCorrida().subscribe({
      next: (dados) => {
        this.corridas = dados;

        console.log('Corridas carregadas:', this.corridas);
      },

      error: (erro) => {
        console.log('Erro ao carregar corridas:', erro);
      }
    });

  }

  selecionarAtleta(): void {

    if (this.atletaSelecionado) {
      this.categoria = this.calcularCategoria(this.atletaSelecionado);
    }

  }

  buscarPorCpf(): void {

    if (!this.cpfBusca) {
      return;
    }

    const cpfDigitado = this.cpfBusca.replace(/\D/g, '');

    const atletaEncontrado = this.atletas.find(atleta => {

      const cpfAtleta = atleta.cpf
        ? atleta.cpf.toString().replace(/\D/g, '')
        : '';

      return cpfAtleta === cpfDigitado;

    });

    if (atletaEncontrado) {

      this.atletaSelecionado = atletaEncontrado;

      this.categoria = this.calcularCategoria(atletaEncontrado);

      console.log('Atleta encontrado:', atletaEncontrado);

    } else {

      this.atletaSelecionado = null;
      this.categoria = '';

      console.log('Atleta não encontrado');

    }

  }

  calcularIdade(atleta: Atleta): number | null {

    if (!atleta.dataNascimento) {
      return null;
    }

    const hoje = new Date();
    const nascimento = new Date(atleta.dataNascimento);

    let idade = hoje.getFullYear() - nascimento.getFullYear();

    const mes = hoje.getMonth() - nascimento.getMonth();

    if (
      mes < 0 ||
      (mes === 0 && hoje.getDate() < nascimento.getDate())
    ) {
      idade--;
    }

    return idade >= 0 ? idade : null;
  }

  calcularCategoria(atleta: Atleta): string {

    const idade = this.calcularIdade(atleta);

    if (idade === null) {
      return '';
    }

    let faixaEtaria = '';

    if (idade <= 17) {
      faixaEtaria = 'Até 17 anos';

    } else if (idade <= 29) {
      faixaEtaria = '18-29 anos';

    } else if (idade <= 39) {
      faixaEtaria = '30-39 anos';

    } else if (idade <= 49) {
      faixaEtaria = '40-49 anos';

    } else if (idade <= 59) {
      faixaEtaria = '50-59 anos';

    } else {
      faixaEtaria = '60+ anos';
    }

    let sexo = 'Geral';

    if (atleta.sexo) {

      const sexoAtleta = atleta.sexo.toLowerCase();

      if (sexoAtleta === 'masculino') {
        sexo = 'Geral Masculino';
      }

      if (sexoAtleta === 'feminino') {
        sexo = 'Geral Feminino';
      }

    }

    return `${sexo} / ${faixaEtaria}`;
  }

  escolherDistancia(): void {

    if (this.distancia === '5km') {
      this.valorInscricao = 69.90;
    }

    if (this.distancia === '10km') {
      this.valorInscricao = 79.90;
    }

    if (this.distancia === '25km') {
      this.valorInscricao = 89.90;
    }

  }

  finalizarInscricao(): void {

    if (!this.atletaSelecionado) {
      alert('Selecione um atleta.');
      return;
    }

    if (!this.corridaSelecionada) {
      alert('Selecione uma corrida.');
      return;
    }

    if (!this.distancia) {
      alert('Selecione a distância da prova.');
      return;
    }

    if (!this.tamanhoCamiseta) {
      alert('Selecione o tamanho da camiseta.');
      return;
    }

    if (!this.termosAceitos) {
      alert('Você precisa aceitar os termos do regulamento.');
      return;
    }

    console.log('INSCRIÇÃO FINALIZADA');

    console.log({
      atleta: this.atletaSelecionado,
      corrida: this.corridaSelecionada,
      distancia: this.distancia,
      tamanhoCamiseta: this.tamanhoCamiseta,
      categoria: this.categoria,
      valor: this.valorInscricao
    });

    alert('Inscrição realizada com sucesso!');
  }

}
