import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AtletaServiceService } from '../../service/atleta-service.service';
import { Atleta } from '../../models/Atleta';

@Component({
  selector: 'app-atleta',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './atleta.component.html',
  styleUrl: './atleta.component.css'
})
export class AtletaComponent {
  //Declarando Atributos
  nome = ''
  cpf = 0
  sexo = ''
  cep = 0
  ruaLogradouro = ''
  bairro = ''
  cidade = ''
  uf = ''

  //Declaração do construtor
  constructor(private atletaService: AtletaServiceService){

  }

  //DECLARAÇÃO DE FUNÇÕES
  exibirDados() {
    console.log(this.nome, this.cpf, this.sexo, this.cep, this.ruaLogradouro, this.bairro, this.cidade, this.uf)

    this.limparDados()
  }

  limparDados() {
    this.nome = ''
    this.cpf = 0
    this.sexo = ''
    this.cep = 0
    this.ruaLogradouro = ''
    this.bairro = ''
    this.cidade = ''
    this.uf = ''
  }

  carregaDados(idAtleta: number){
    this.atletaService.listarAtleta(idAtleta).subscribe({
      next:(dadosAtleta)=>{
        this.nome = dadosAtleta.nome
        this.cpf = dadosAtleta.cpf
        this.sexo = dadosAtleta.sexo
        this.cep = dadosAtleta.cep
        this.ruaLogradouro = dadosAtleta.ruaLogradouro
        this.bairro = dadosAtleta.bairro
        this.cidade = dadosAtleta.cidade
        this.uf = dadosAtleta.uf


      },
      error: (msgErro)=>{
        console.log( 'ERRO AO LISTAR ATLETA ', msgErro)
      }
    })
  }

  enviarDadosAtleta(){
    const atleta = new Atleta()
    atleta.nome = this.nome
    atleta.cpf = this.cpf
    atleta.sexo = this.sexo
    atleta.cep = this.cep
    atleta.ruaLogradouro = this.ruaLogradouro
    atleta.bairro = this.bairro
    atleta.cidade = this.cidade
    atleta.uf = this.uf

    this.atletaService.salvarAtleta(atleta).subscribe({
      next: (resposta)=>{
        console.log( resposta)
      }, 
      error:(msgErro)=>{
        console.log( msgErro)
      }
    })

    this.limparDados()

    this.atletaService.listarAtletas()
  }
}
