import { Usuario } from 'src/app/models/usuario.model';
import { Component, OnInit, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  @Input()
  user: Observable<firebase.User>;
  @Input()
  funcionarioLogado: Usuario;

  constructor(private authServ: AuthenticationService, private router: Router) { }

  async ngOnInit() { }

  goToEmpresa() {
    this.router.navigate(['/admin/empresa'],
      {
        state: {
          usuarioLogado: this.funcionarioLogado
        }
      })
  }

  goToFuncionario() {
    this.router.navigate(['/admin/funcionario'],
      {
        state: {
          usuarioLogado: this.funcionarioLogado
        }
      })
  }
  sair() {
    this.authServ.logout().then(() => this.router.navigate(['/']));
  }


}
