import { Funcionario } from './../../../../models/funcionario.model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { PontoService } from 'src/app/services/ponto.service';
import { Observable } from 'rxjs';
import { Ponto } from 'src/app/models/ponto.model';
import * as moment from 'moment';
import { Log } from 'src/app/models/log.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ponto-hoje',
  templateUrl: './ponto-hoje.component.html',
  styleUrls: ['./ponto-hoje.component.scss']
})
export class PontoHojeComponent implements OnInit {

  funcionarioLogado: Funcionario;
  pontosHoje: Observable<Ponto[]>;
  ponto: Ponto;
  hoje: any;
  displayDialogPonto: boolean;

  constructor(
    private pontoService: PontoService,
    private router: Router,
    private spinner: NgxSpinnerService) {
    this.funcionarioLogado = this.router.getCurrentNavigation().extras.state['usuarioLogado']
  }

  ngOnInit() {
    try {
      this.spinner.show()
      const now = moment();
      this.hoje = now.format("DD/MM/YY");
      this.pontosHoje = this.pontoService.consultaPontoHojeTodosFuncionariosByEmpresa(this.funcionarioLogado.empresa.cnpj)
      this.pontosHoje.subscribe(() => this.spinner.hide())
    } catch (e) {
      console.log(`Erro ao abrir o componente ${e}`);
      this.spinner.hide();
    }
  }

  detalhesPonto(p: Ponto) {
    this.ponto = p;
    this.displayDialogPonto = true;
    this.ponto.primeiraBatida = (p.primeiraBatida) ? p.primeiraBatida.toDate() : '';
    this.ponto.segundaBatida = (p.segundaBatida) ? p.segundaBatida.toDate() : '';
    this.ponto.terceiraBatida = (p.terceiraBatida) ? p.terceiraBatida.toDate() : '';
    this.ponto.quartaBatida = (p.quartaBatida) ? p.quartaBatida.toDate() : '';

  }

  updatePontoServidor() {
    const log = new Log();
    log.acao = "Atualizou o ponto";
    log.dataLog = new Date();
    log.usuario = this.funcionarioLogado;

    this.ponto.log = Object.assign({}, log);

    this.pontoService.update(this.ponto)
      .then(() => {
        Swal.fire({ title: `Ponto atualizado com sucesso!`, timer: 3000, type: 'success', showConfirmButton: false })
        this.displayDialogPonto = false;
      })
      .catch(erro => {
        Swal.fire({ title: `Erro ao  atualizar o ponto!`, timer: 3000, type: 'error', showConfirmButton: false })
      })
  }





}
