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
  usuarioLogado: Usuario;
  constructor(
    private authServ: AuthenticationService,
    private usuarioService: UsuarioService,
    private router: Router) { }

  async ngOnInit() {
    this.user = this.authServ.authUser();
    this.user.subscribe(dados => {
      if (dados) {
        this.usuarioService.getUsuarioByEmail(dados.email)
          .subscribe(u => {
            if (u) this.usuarioLogado = u
          })
      }
    })

  }



  sair() {
    this.authServ.logout().then(() => this.router.navigate(['/']));
  }
}

