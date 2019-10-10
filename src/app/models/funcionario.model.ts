import { Model } from '../services/model';
import { Empresa } from './empresa.model';

export class Funcionario extends Model {
  rg: string;
  cpf: string;
  nome: string;
  funcao: string;
  nivelSistema: string;
  celular: string;
  foto: string;
  email: string;
  dataNascimento: any;
  horaExtra: boolean;
  empresa: Empresa;
}
