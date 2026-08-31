import { Atleta } from './Atleta';
import { CadastroCorrida } from './CadastroCorrida';

export class Inscricao {
  id: number = 0;

  atleta!: Atleta;
  corrida!: CadastroCorrida;

  distancia: string = '';
  tamanhoCamiseta: string = '';
  categoria: string = '';
  valor: number = 0;

  termosAceitos: boolean = false;
}