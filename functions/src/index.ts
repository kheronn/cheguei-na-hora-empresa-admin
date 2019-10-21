import * as functions from 'firebase-functions';
import * as nodemailer from "nodemailer";


import * as admin from 'firebase-admin';
admin.initializeApp();
const db = admin.firestore();


const mailTransport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'kheronn@gmail.com',
    pass: '11khaike'
  }
});

exports.createUser = functions.firestore
  .document('/funcionarios/{documentId}')
  .onCreate((snap, context) => {

    const funcionario = snap.data();
    if (funcionario.nivelSistema == 'Gerente') { // Cria usuário para Controle Administrativo
      const rg = funcionario.rg;
      const email = funcionario.email;
      const nome = funcionario.nome;

      return admin.auth().createUser({
        uid: `${email}`,
        email: `${email}`,
        emailVerified: false,
        password: funcionario.rg,
        displayName: `${nome}`,
        disabled: false
      }).then((userRecord) => {
        console.log('Usuário administrativo registrado com sucesso')
        return userRecord;
      })
        .catch((error) => {
          console.log("Não foi possível criar o usuário:", error);
        });
    } else {
      return null;
    }
  })


