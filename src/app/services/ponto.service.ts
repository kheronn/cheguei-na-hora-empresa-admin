import { Injectable } from '@angular/core';
import { ServiceFirebase } from './servicefirebase.service';
import { Ponto } from '../models/ponto.model';
import { AngularFirestore } from '@angular/fire/firestore';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class PontoService extends ServiceFirebase<Ponto> {

  constructor(firestore: AngularFirestore) {
    super(Ponto, firestore, 'funcionarios');
  }

  consultaPontoByPeriodoFuncionario(inicio: Date, fim: Date, idFunc: string) {

    return this.firestore.collection<Ponto>('pontos', ref =>
      ref.where('dataPonto', '>=', inicio)
        .where('dataPonto', '<', fim)
        .where('idFunc', '==', idFunc)

        .orderBy('dataPonto', 'desc')
    ).valueChanges()
  }


  consultaPontoHojeTodosFuncionariosByEmpresa(cnpj: string) {
    const now = moment();
    const datestamp = now.format("DD-MM-YYYY");
    return this.firestore.collection<Ponto>('pontos', ref =>
      ref.where('dataPontoFormatado', '==', datestamp)
        .where('empresa.cnpj', '==', cnpj)
        .orderBy('nome', 'asc')
    ).valueChanges()

  }

  update(p: Ponto) {
    return this.firestore.collection<Ponto>('pontos').ref.doc(p.idPonto).set(p);
  }


}
