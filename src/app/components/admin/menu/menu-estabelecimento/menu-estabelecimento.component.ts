import { Usuario } from 'src/app/models/usuario.model';
import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-estabelecimento',
  templateUrl: './menu-estabelecimento.component.html',
  styleUrls: ['./menu-estabelecimento.component.css']
})
export class MenuEstabelecimentoComponent implements OnInit {
  @Input() user: Observable<firebase.User>;
  @Input() usuarioLogado: Usuario;

  constructor(private authServ: AuthenticationService, private router: Router) { }

  async ngOnInit() { }

  sair() {
    this.authServ.logout().then(() => this.router.navigate(['/']));
  }

  goToRelatorio() {
    this.router.navigate(['/admin/relatorio'],
      {
        state: {
          usuarioLogado: this.usuarioLogado
        }
      })
  }
  goToInstituicao() {
    this.router.navigate(['/admin/instituicao'],
      {
        state: {
          usuarioLogado: this.usuarioLogado
        }
      })
  }
  goToCadastro() {
    this.router.navigate(['/admin/usuario'],
      {
        state: {
          usuarioLogado: this.usuarioLogado
        }
      })
  }


}
