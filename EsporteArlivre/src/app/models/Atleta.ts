export class Atleta {
    id: number = 0;
    nome: string = '';
    cpf: number = 0; // O schema da API espera número para o CPF
    sexo: string = '';
    cep: number = 0;
    rua_logradouro: string = ''; // Alterado de ruaLogradouro para rua_logradouro
    bairro: string = '';
    cidade: string = '';
    uf: string = '';
    data_nascimento: string = ''; // Alterado de dataNascimento para data_nascimento
    peso: number = 0; // Adicionado (Obrigatório na API)
    altura: number = 0; // Adicionado (Obrigatório na API)
}