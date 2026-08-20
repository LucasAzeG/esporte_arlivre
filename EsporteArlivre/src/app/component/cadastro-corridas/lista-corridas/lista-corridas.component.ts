import { Component, OnInit } from '@angular/core';
import { signal } from '@angular/core';
import { CadastroCorrida } from '../../../models/CadastroCorrida';
import { CadastroCorridasService } from '../../../service/cadastrocorrida.service';

@Component({
  selector: 'app-lista-corridas',
  standalone: true,
  imports: [],
  templateUrl: './lista-corridas.component.html',
  styleUrl: './lista-corridas.component.css'
})
export class ListaCorridasComponent {
  
  listaCorridas = signal<CadastroCorrida[]>([]);

  constructor(private corridaService: CadastroCorridasService) {}

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



}
