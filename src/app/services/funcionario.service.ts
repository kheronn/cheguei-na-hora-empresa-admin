import { Injectable } from '@angular/core';
import { ServiceFirebase } from './servicefirebase.service';
import { Usuario } from '../models/usuario.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Funcionario } from '../models/funcionario.model';

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService extends ServiceFirebase<Funcionario> {

  constructor(firestore: AngularFirestore) {
    super(Funcionario, firestore, 'funcionarios');
  }

  consultaPessoaPeloNome(nome: string) {
    var strlength = nome.length;
    var strFrontCode = nome.slice(0, strlength - 1);
    var strEndCode = nome.slice(strlength - 1, nome.length);

    var started = nome;
    var endcode =
      strFrontCode + String.fromCharCode(strEndCode.charCodeAt(0) + 1);

    return this.firestore.collection<Funcionario>("funcionarios", ref =>
        ref.where("nome", ">=", started).where("nome", "<", endcode)
      )
      .valueChanges();
  }

  getFuncionarioByEmpresa(cnpj: string) {
    return this.firestore.collection<Funcionario>('funcionarios', ref =>
      ref.where("empresa.cnpj", "==", cnpj))
      .valueChanges();
  }

  getFuncionarioByCPF(cpf: string) {
    return this.firestore.collection<Funcionario>('funcionarios', ref =>
      ref.where("cpf", "==", cpf))
      .valueChanges()
      .pipe(map(lista => lista[0]));
  }

  getFuncionarioByRG(rg) {
    return this.firestore.collection<Funcionario>('funcionarios', ref =>
      ref.where("rg", "==", rg))
      .valueChanges()
      .pipe(map(lista => lista[0]));
  }

}
