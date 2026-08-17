import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CadastroCorridasService } from '../../service/cadastrocorrida.service';
import { CadastroCorrida } from '../../models/CadastroCorrida';

@Component({
  selector: 'app-cadastro-corridas',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './cadastro-corridas.component.html',
  styleUrl: './cadastro-corridas.component.css'
})
export class CadastroCorridasComponent {

  descricaoCorrida: string = '';
  dataCorrida: string = '';
  distanciaDisponiveis: string = '';

  // 1. Nome da variável padronizado com 'c' minúsculo (cadastroService)
  constructor(private cadastroService: CadastroCorridasService) {}

  exibirDados() {
    console.log(this.descricaoCorrida, this.dataCorrida, this.distanciaDisponiveis);
    this.limparDados(); // Adicionado parênteses () para executar
  }

  limparDados() {
    this.descricaoCorrida = '';
    this.dataCorrida = '';
    this.distanciaDisponiveis = '';
  }

  salvar() {
    // 2. Criamos o objeto 'novaCorrida' primeiro
    const novaCorrida: CadastroCorrida = {
      id:0,
      descricaoCorrida: this.descricaoCorrida,
      dataCorrida: this.dataCorrida,
      distanciaDisponiveis: this.distanciaDisponiveis
    };

    // 3. Chamamos os métodos do serviço e da classe (FORA do console.log)
    this.cadastroService.adicionarCadastroCorrida(novaCorrida);
    this.limparDados();
    this.cadastroService.listarDescricaoCorrida();
  }
}