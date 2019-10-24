import { Funcionario } from 'src/app/models/funcionario.model';
import { Model } from '../services/model';

export class PontoMes extends Model {

  funcionario: Funcionario;
  mesAno: string;
  ultimaImpressao: Object;
  observacao: string;
  constructor() { super() }
}
