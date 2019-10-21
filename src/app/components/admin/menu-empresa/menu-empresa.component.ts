import { Funcionario } from './../../../models/funcionario.model';
import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/models/usuario.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-empresa',
  templateUrl: './menu-empresa.component.html',
  styleUrls: ['./menu-empresa.component.scss']
})
export class MenuEmpresaComponent implements OnInit {

  @Input()
  user: Observable<firebase.User>;
  @Input()
  funcionarioLogado: Funcionario;

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

  goToPontoHoje() {
    this.router.navigate(['/admin/ponto/hoje'],
      {
        state: {
          usuarioLogado: this.funcionarioLogado
        }
      })
  }
  goToPontoFuncionario() {
    this.router.navigate(['/admin/ponto/funcionario'],
      {
        state: {
          usuarioLogado: this.funcionarioLogado
        }
      })
  }
  goToPontoRelatorio() {
    this.router.navigate(['/admin/ponto/relatorio'],
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
