import { Funcionario } from './models/funcionario.model';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationService } from './services/authentication.service';
import { UsuarioService } from './services/usuario.service';
import { Router } from '@angular/router';
import { Usuario } from './models/usuario.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  user: Observable<firebase.User>;
  funcionarioLogado: Funcionario;
  constructor(
    private authServ: AuthenticationService,
    private usuarioService: UsuarioService,
    private router: Router) { }

  async ngOnInit() {
    this.user = this.authServ.authUser();
    this.user.subscribe(dados => {
      if (dados) {
        this.usuarioService.getFuncionarioByEmail(dados.email)
          .subscribe(u => {
           if (u) this.funcionarioLogado = u
          })
      }
    })

  }



  sair() {
    this.authServ.logout().then(() => this.router.navigate(['/']));
  }
}

