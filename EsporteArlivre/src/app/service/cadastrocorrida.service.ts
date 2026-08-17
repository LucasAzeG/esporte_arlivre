import { Injectable } from '@angular/core';
import { CadastroCorrida } from '../models/CadastroCorrida';

@Injectable({
  providedIn: 'root'
})
export class CadastroCorridasService {
  // Declaração do ARRAY de corridas
  private cadastrocorridas: CadastroCorrida[] = [];

  constructor() { }

  // Adicionar elemento
  adicionarCadastroCorrida(cadastrocorrida: CadastroCorrida) {
    // 1. Gera o ID primeiro
    cadastrocorrida.id = this.cadastrocorridas.length + 1;
    // 2. Adiciona ao array apenas UMA vez
    this.cadastrocorridas.push(cadastrocorrida);
  }

  // Listar elementos
  listarDescricaoCorrida(): CadastroCorrida[] {
    console.table(this.cadastrocorridas);
    return this.cadastrocorridas;
  }

  // Remover por ID
  removerElemento(idDescricaoCorrida: number) {
    this.cadastrocorridas = this.cadastrocorridas.filter(elem => elem.id !== idDescricaoCorrida);
  }

  // Remover recebendo o objeto
  removerElemento2(cadastrocorrida: CadastroCorrida) {
    let posArray = this.cadastrocorridas.findIndex(elem => elem.id === cadastrocorrida.id);
    
    if (posArray !== -1) {
      this.cadastrocorridas.splice(posArray, 1);
    }
  }

  // Alterar elemento do array
  alterarElemento(cadastrocorrida: CadastroCorrida) {
    let posArray = this.cadastrocorridas.findIndex(elem => elem.id === cadastrocorrida.id);
    
    if (posArray !== -1) {
      this.cadastrocorridas[posArray] = cadastrocorrida;
    }
  }
}