import { Injectable } from '@angular/core';
import { ServiceFirebase } from './servicefirebase.service';
import { Usuario } from '../models/usuario.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService extends ServiceFirebase<Usuario> {

  constructor(firestore: AngularFirestore) {
    super(Usuario, firestore, 'usuarios');
  }

  getUsuarioByEmail(email) {
    return this.firestore.collection<Usuario>('usuarios', ref =>
      ref.where("email", "==", email))
      .valueChanges()
      .pipe(
        map(lista => lista[0])
      )
  }
}
