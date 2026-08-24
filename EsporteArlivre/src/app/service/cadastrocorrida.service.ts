import { Injectable } from '@angular/core';
import { CadastroCorrida } from '../models/CadastroCorrida';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CadastroCorridasService {
  // Declaração do ARRAY de corridas
  private cadastrocorridas: CadastroCorrida[] = [];

  // 2. Declarar a propriedade da URL da API
  private API_URL = 'http://localhost:8080/corridas';

  constructor(private http: HttpClient) { }

  // Adicionar elemento
  adicionarCadastroCorrida(corrida: CadastroCorrida): Observable<void> {
    return new Observable((observer) => {
      corrida.id = this.cadastrocorridas.length + 1;
      this.cadastrocorridas.push(corrida);
      
      observer.next(); 
      observer.complete();
    });
  }

  // Listar elementos
  listarDescricaoCorrida(): Observable<CadastroCorrida[]> {
    return new Observable((observer) => {
      observer.next(this.cadastrocorridas); // Retorna a lista gravada na memória
      observer.complete();
    });
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

  // Buscar por ID
buscarPorId(id: number): Observable<CadastroCorrida | undefined> {
  return new Observable((observer) => {
    const corrida = this.cadastrocorridas.find(c => c.id === id);
    observer.next(corrida);
    observer.complete();
  });
}

excluir(id: number): Observable<boolean> {
  return new Observable((observer) => {
    this.cadastrocorridas = this.cadastrocorridas.filter(c => c.id !== id);
    observer.next(true);
    observer.complete();
  });
}
}