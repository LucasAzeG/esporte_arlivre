import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CadastroCorridasService } from '../../service/cadastrocorrida.service';
import { CadastroCorrida } from '../../models/CadastroCorrida';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';

@Component({
  selector: 'app-cadastro-corridas',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './cadastro-corridas.component.html',
  styleUrl: './cadastro-corridas.component.css'
})
export class CadastroCorridasComponent implements OnInit {

  descricaoCorrida: string = '';
  dataCorrida: string = '';
  distanciaDisponiveis: string = '';
  idCorrida: number = 0;
  editar: boolean = false;

  // 1. Nome da variável padronizado com 'c' minúsculo (cadastroService)
  constructor(
    private cadastroService: CadastroCorridasService,
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient
    ) {}


    ngOnInit(): void {
      // Captura o ID que vem pela URL (ex: cadastro-corridas/1)
      this.idCorrida = Number(this.route.snapshot.paramMap.get('id'));
  
      if (this.idCorrida > 0) {
        this.editar = true;
        this.carregarDados(this.idCorrida);
      }
    }


    carregarDados(id: number) {
      this.cadastroService.buscarPorId(id).subscribe({
        next: (corrida) => {
          if (corrida) {
            this.descricaoCorrida = corrida.descricaoCorrida;
            this.dataCorrida = corrida.dataCorrida;
            this.distanciaDisponiveis = corrida.distanciaDisponiveis;
          }
        }
      });
    }

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
    this.cadastroService.adicionarCadastroCorrida(novaCorrida).subscribe({
      next: () => {
        this.limparDados();
        this.router.navigate(['/listaCorridas']); // 3. Redireciona para a lista
      },
      error: (err) => console.log('Erro ao salvar corrida', err)
    });
  }


  
}