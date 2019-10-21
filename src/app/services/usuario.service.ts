import { Funcionario } from './../models/funcionario.model';
import { Injectable } from '@angular/core';
import { ServiceFirebase } from './servicefirebase.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService extends ServiceFirebase<Funcionario> {

  constructor(firestore: AngularFirestore) {
    super(Funcionario, firestore, 'funcionarios');
  }

  getFuncionarioByEmail(email)  {
    return this.firestore.collection<Funcionario>('funcionarios', ref =>
      ref.where("email", "==", email))
      .valueChanges()
      .pipe(
        map(lista => lista[0])
      )
  }
}
