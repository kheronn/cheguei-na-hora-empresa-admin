import { Model } from '../services/model';

export class Empresa extends Model {

  cnpj: string;
  nome: string;
  telefone: string;
  endereco: string;
  cidade: string;
  contato: string;
  lat: number;
  lng: number;
}
