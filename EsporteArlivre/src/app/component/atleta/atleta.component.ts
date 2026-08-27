import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AtletaServiceService } from '../../service/atleta-service.service';
import { Atleta } from '../../models/Atleta';
import { ActivatedRoute, Router } from '@angular/router';

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
  cpf = ''
  sexo = ''
  cep = 0
  ruaLogradouro = ''
  bairro = ''
  cidade = ''
  uf = ''
  dataNascimento: string = '';

  idAtleta = 0
  editar = false

  //Declaração do construtor
  constructor(
    private atletaService: AtletaServiceService,
    private http: ActivatedRoute,
    private router: Router
    ){}

  //DECLARAÇÃO DE FUNÇÕES
  exibirDados() {
    console.log(this.nome, this.cpf, this.sexo, this.cep, this.ruaLogradouro, this.bairro, this.cidade, this.uf)

    this.limparDados()
  }

  ngOnInit(){
    this.idAtleta = Number(this.http.snapshot.paramMap.get('id'))

    if(this.idAtleta > 0){
      this.editar = true
      this.carregaDados(this.idAtleta)
    }
  }

  limparDados() {
    this.nome = ''
    this.cpf = ''
    this.sexo = ''
    this.cep = 0
    this.ruaLogradouro = ''
    this.bairro = ''
    this.cidade = ''
    this.uf = ''
    this.dataNascimento = ''
  }

  somenteCpf(event: KeyboardEvent) {
    const tecla = event.key;
  
    const teclasPermitidas = [
      'Backspace',
      'Delete',
      'ArrowLeft',
      'ArrowRight',
      'Tab'
    ];
  
    if (teclasPermitidas.includes(tecla)) {
      return;
    }
  
    if (!/[0-9.-]/.test(tecla)) {
      event.preventDefault();
    }
  }

  carregaDados(idAtleta: number) {
    this.atletaService.listarAtleta(idAtleta).subscribe({
      next: (dadosAtleta) => {
        this.nome = dadosAtleta.nome || '';
        this.cpf = dadosAtleta.cpf || '';
        this.sexo = dadosAtleta.sexo || '';
        this.cep = dadosAtleta.cep || 0;
        this.ruaLogradouro = dadosAtleta.ruaLogradouro || '';
        this.bairro = dadosAtleta.bairro || '';
        this.cidade = dadosAtleta.cidade || '';
        this.uf = dadosAtleta.uf || '';
        this.dataNascimento = dadosAtleta.dataNascimento || '';
      },
      error: (msgErro) => {
        console.log('ERRO AO LISTAR ATLETA ', msgErro);
      }
    });
  }

  enviarDadosAtleta(form: NgForm){

    if (form.invalid) {
      form.control.markAllAsTouched();
      console.log('Formulário inválido');
      return;
    }

  
  
    console.log('Entrou no enviar')
    const atleta = new Atleta()
    atleta.nome = this.nome
    atleta.cpf = this.cpf
    atleta.sexo = this.sexo
    atleta.cep = this.cep
    atleta.ruaLogradouro = this.ruaLogradouro
    atleta.bairro = this.bairro
    atleta.cidade = this.cidade
    atleta.uf = this.uf
    atleta.dataNascimento = this.dataNascimento
  
    if(this.editar){
      atleta.id = this.idAtleta
  
      this.atletaService.alterarAtleta(atleta).subscribe({
        next: (resposta)=>{
          console.log(resposta);
          this.limparDados();
          this.router.navigate(['/atletaLista']);
        }, 
        error:(msgErro)=>{
          console.log(msgErro)
        }
      })
    }else{
      this.atletaService.salvarAtleta(atleta).subscribe({
        next: (resposta)=>{
          console.log(resposta);
          this.limparDados();
          this.router.navigate(['/atletaLista']);
        }, 
        error:(msgErro)=>{
          console.log(msgErro)
        }
      })
    }
  }

  calcularIdade(): number | null {
    if (!this.dataNascimento) return null;

    const hoje = new Date();
    const nascimento = new Date(this.dataNascimento);
    
    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const mes = hoje.getMonth() - nascimento.getMonth();

    // Ajusta a idade se a pessoa ainda não fez aniversário no ano corrente
    if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
      idade--;
    }

    return idade >= 0 ? idade : null;

    
  }
}
