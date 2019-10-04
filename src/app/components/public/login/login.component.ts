import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'
import * as firebase from 'firebase/app';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  senha: string;
  mensagem: string;
  emailEnviado: boolean;

  windowRef: any;
  verificationCode: string;


  constructor(private authServ: AuthenticationService, private router: Router) { }

  ngOnInit() {
    console.log('Component login')
    this.windowRef = window;
    this.windowRef.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container')
    this.windowRef.recaptchaVerifier.render()
  }

  logar() {
    try {
      if (this.email == undefined ||
        this.senha == undefined) {
        this.mensagem = 'Usuário ou senha vazios'
        return
      }
      this.authServ.login(this.email, this.senha)
        .then(() => {
          this.router.navigate(['/admin/painel'])
        })
        .catch(erro => {
          let detalhes = '';
          switch (erro.code) {
            case 'auth/user-not-found': {
              detalhes = 'Não existe usuário para o email informado';
              break;
            }
            case 'auth/invalid-email': {
              detalhes = 'Email inválido';
              break;
            }
            case 'auth/wrong-password': {
              detalhes = 'Senha Inválida';
              break;
            }
            default: {
              detalhes = erro.message;
              break;
            }
          }
          this.mensagem = `Erro ao logar. ${detalhes}`;
        });
    } catch (erro) {
      this.mensagem = `Erro ao logar. Detalhes: ${erro}`;
    }

  }

  async enviaLink() {
    const { value: email } = await Swal.fire({
      title: 'Informe o email cadastrado',
      input: 'email',
      inputPlaceholder: 'email'
    })
    if (email) {
      this.authServ.resetPassword(email)
        .then(() => {
          this.emailEnviado = true;
          this.mensagem = `Email enviado para ${email} com instruções para recuperação.`
        })
        .catch(erro => {
          this.mensagem = `Erro ao localizar o email. Detahes ${erro.message}`
        })
    }
  }

  async recebeCodigo() {
    const appVerifier = this.windowRef.recaptchaVerifier;
    const { value: telefone } = await Swal.fire({
      title: 'Informe o Telefone Cadastrado',
      input: 'tel',
      inputPlaceholder: '(DD)9999999'
    })
    if (telefone) {
      const num = '+55' + telefone;
      firebase.auth().signInWithPhoneNumber(num, appVerifier)
        .then(result => {
          this.windowRef.confirmationResult = result;
          this.mensagem = `Você receberá um SMS com código no número ${telefone} .`
        })
        .catch(error => console.log(error));
    }
  }

  verifyLoginCode() {
    this.windowRef.confirmationResult
      .confirm(this.verificationCode)
      .then(result => {
        this.router.navigate(['/admin/painel'])
      })
      .catch(error => this.mensagem = `Código incorreto. Detalhes ${error} .`);
  }



}
