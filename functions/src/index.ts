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
    const email = funcionario.email;
    const rg = funcionario.rg;
    const nome = funcionario.nome;


    return admin.auth().createUser({
      uid: `${email}`,
      email: `${email}`,
      emailVerified: false,
      password: `123456`,
      displayName: `${nome}`,
      disabled: false
    }).then((userRecord) => {
      console.log('Usuário registrado com sucesso')
      return userRecord;
    })
      .catch((error) => {
        console.log("Não foi possível criar o usuário:", error);
      });
  })


