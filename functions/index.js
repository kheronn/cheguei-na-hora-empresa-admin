const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');
admin.initializeApp();


let mailTransport = nodemailer.createTransport({
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
    const nome = funcionario.nome;
    const rg = funcionario.rg;


    return admin.auth().createUser({
      uid: `${email}`,
      email: `${email}`,
      emailVerified: false,
      password: rg,
      displayName: `${nome}`,
      disabled: false
    }).then((userRecord) => {
      console.log('Usuário administrativo registrado com sucesso')
      return userRecord;
    })
      .catch((error) => {
        console.log("Não foi possível criar o usuário:", error);
      });
  })
