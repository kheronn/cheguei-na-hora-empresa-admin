import { Funcionario } from './funcionario.model';
import { Model } from '../services/model';
import { Log } from './log.model';

export class Ponto extends Model {
  idPonto: string;
  nome: string;
  idFunc: string;
  dataPonto: any;
  dataPontoFormatado: string;
  tipoOcorrencia?: string;
  primeiraBatida?: any;
  segundaBatida?: any;
  terceiraBatida?: any;
  quartaBatida?: any;
  ocorrencia: boolean;
  justificativa: string;
  ocorrenciaDescricao: string;
  log?: Log;

}
