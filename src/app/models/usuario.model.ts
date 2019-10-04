import { Model } from '../services/model';

export class Usuario extends Model {
  email: string;
  nome: string;
  celular: string;
  foto: string;
  rg: string;
  acesso: string;
  ultimoAcesso: any;
}
