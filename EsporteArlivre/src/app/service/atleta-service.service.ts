import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Atleta } from '../models/Atleta';

@Injectable({
  providedIn: 'root'
})
export class AtletaServiceService {

  constructor(private http: HttpClient) { }

  listarAtletas(): Observable<Atleta[]> {
    const urlApi = `https://6a7f6d923183f5fd884b1a61.mockapi.io/esportearlivre/atleta`;
    return this.http.get<Atleta[]>(urlApi);
  }

  listarAtleta(idAtleta: number): Observable<Atleta> {
    const urlApi = `https://6a7f6d923183f5fd884b1a61.mockapi.io/esportearlivre/atleta/${idAtleta}`;
    return this.http.get<Atleta>(urlApi);
  }

  salvarAtleta(atleta: Atleta): Observable<Atleta> {
    const urlApi = `https://6a7f6d923183f5fd884b1a61.mockapi.io/esportearlivre/atleta`;
    return this.http.post<Atleta>(urlApi, atleta);
  }

  excluirAtleta(idAtleta: number): Observable<Atleta> {
    const urlApi = `https://6a7f6d923183f5fd884b1a61.mockapi.io/esportearlivre/atleta/${idAtleta}`;
    return this.http.delete<Atleta>(urlApi);
  }

  alterarAtleta(atleta: Atleta): Observable<Atleta> {
    const urlApi = `https://6a7f6d923183f5fd884b1a61.mockapi.io/esportearlivre/atleta/${atleta.id}`;
    return this.http.put<Atleta>(urlApi, atleta);
  }

  calcularIdade(data_nascimento: string): number {
    const dt_nascimento = new Date(data_nascimento + "T00:00:00");
    const hoje = new Date();
  
    let idade = hoje.getFullYear() - dt_nascimento.getFullYear();
    const resp_calc_mes = hoje.getMonth() - dt_nascimento.getMonth();
  
    if (resp_calc_mes < 0 || (resp_calc_mes === 0 && hoje.getDate() < dt_nascimento.getDate())) {
      idade--;
    }
  
    return idade;
  }

  /*
    // Declaração de ARRAY Atletas
    private atletas: Atleta[] = []

     //Declaraçãp das funções de manipulação do array
  //Adicionando elemento
  adicionarAtleta(atleta: Atleta) {
    this.atletas.push(atleta)
  

  //Para gerar ID
  atleta.id = this.atletas.length + 1
  this.atletas.push(atleta)
  }

  //Listar elem
  //Remover elemento
  removerElemento(idAtleta: number){
    this.atletas = this.atletas.filter(elem=>elem.id !==idAtleta)
  }

  //Remover eleento2
  removerElemento2(atleta: Atleta){
    let posArray = this.atletas.findIndex(elem=>elem.id !== atleta.id)
    this.atletas.splice(1,posArray)
  }

    //Alterando elemento do array
    alterarElemento(atleta: Atleta){
      let posArray = this.atletas.findIndex(elem=>elem.id !== atleta.id)
      this.atletas[posArray] = atleta
    }*/

}