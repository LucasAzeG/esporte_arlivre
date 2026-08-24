import { Component } from '@angular/core';
import { Atleta } from '../../../models/Atleta';
import { AtletaServiceService } from '../../../service/atleta-service.service';
import { Router } from '@angular/router';
import { signal } from '@angular/core';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-atleta-lista',
  standalone: true,
  imports: [],
  templateUrl: './atleta-lista.component.html',
  styleUrl: './atleta-lista.component.css'
})
export class AtletaListaComponent {

  //listaAtletas: Atleta[] = []
  listaAtletas = signal<Atleta[]>([]);

  constructor(private listaService: AtletaServiceService, private router: Router) { }

  ngOnInit(){
    this.listar()
  }

  listar() {
    this.listaService.listarAtletas().subscribe({
      next: (dadosAtletas) => {
        // Proteção adicionada: (a.nome || '') evita erro se o nome vier null
        this.listaAtletas.set(
          [...dadosAtletas].sort((a, b) => (a.nome || '').localeCompare(b.nome || ''))
        );
      },
      error: (msgErro) => {
        console.log("Erro ao listar Atletas ", msgErro);
      }
    });
  }

  excluir(id: number) {
    if (confirm("Deseja Excluir o Atleta?")) {
      this.listaService.excluirAtleta(id).subscribe({
        next: (resposta) => {
          console.log("Excluído com Sucesso!!! ", resposta)

          this.listar()
        },
        error: (msgErro) => {
          console.log("Erro ao listar Atletas ", msgErro)
        }
      })
    }
  }

  carregaDadosAtletaForm(atleta: Atleta) {
    this.router.navigate(['/cadastroAtleta', atleta.id])
  }

  calcularIdade(dataNascimento?: string): string {
    if (!dataNascimento) return 'N/A';
  
    const hoje = new Date();
    const nascimento = new Date(dataNascimento);
    
    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const mes = hoje.getMonth() - nascimento.getMonth();
  
    if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
      idade--;
    }
  
    return idade >= 0 ? `${idade} anos` : 'N/A';
  }
}
