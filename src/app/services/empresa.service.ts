import { Injectable } from '@angular/core';
import { ServiceFirebase } from './servicefirebase.service';
import { Usuario } from '../models/usuario.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Empresa } from '../models/empresa.model';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService extends ServiceFirebase<Empresa> {

  constructor(firestore: AngularFirestore) {
    super(Empresa, firestore, 'empresas');
  }


  getEmpresaByCNPJ(cnpj) {
    return this.firestore.collection<Empresa>('empresas', ref =>
      ref.where("cnpj", "==", cnpj))
      .valueChanges()
      .pipe(
        map(lista => lista[0])
      )
  }
}
