import { Component, OnInit } from '@angular/core';
import { signal } from '@angular/core';
import { CadastroCorrida } from '../../../models/CadastroCorrida';
import { CadastroCorridasService } from '../../../service/cadastrocorrida.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-corridas',
  standalone: true,
  imports: [],
  templateUrl: './lista-corridas.component.html',
  styleUrl: './lista-corridas.component.css'
})
export class ListaCorridasComponent {
  
  listaCorridas = signal<CadastroCorrida[]>([]);

  constructor(private corridaService: CadastroCorridasService,
    private router: Router
    ) {}

  ngOnInit(): void {
    this.listar();
  }

  listar() {
    this.corridaService.listarDescricaoCorrida().subscribe({
      next: (dados) => {
        this.listaCorridas.set(dados);
      },
      error: (msgErro) => {
        console.log("Erro ao buscar corridas", msgErro);
      }
    });
  }


// 3. Criar a função que faltava
carregaDadosCorridaForm(corrida: CadastroCorrida) {
  this.router.navigate(['/cadastro-corridas', corrida.id]);
}

excluir(id: number) {
  if (confirm("Deseja realmente excluir esta corrida?")) {
    this.corridaService.excluir(id).subscribe({
      next: () => {
        console.log("Corrida excluída com sucesso!");
        this.listar(); // Recarrega a lista na tela
      },
      error: (msgErro) => console.log("Erro ao excluir corrida", msgErro)
    });
  }
}

}
