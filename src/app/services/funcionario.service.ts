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


  getFuncionarioByCPF(cpf) {
    return this.firestore.collection<Funcionario>('funcionarios', ref =>
      ref.where("cpf", "==", cpf))
      .valueChanges()
      .pipe(
        map(lista => lista[0])
      )
  }
  getFuncionarioByRG(rg) {
    return this.firestore.collection<Funcionario>('funcionarios', ref =>
      ref.where("rg", "==", rg))
      .valueChanges()
      .pipe(
        map(lista => lista[0])
      )
  }
}
