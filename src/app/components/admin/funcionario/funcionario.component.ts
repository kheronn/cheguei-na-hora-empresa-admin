import { FuncionarioService } from './../../../services/funcionario.service';
import { Funcionario } from './../../../models/funcionario.model';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario.model';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { EmpresaService } from 'src/app/services/empresa.service';
import { Empresa } from 'src/app/models/empresa.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-funcionario',
  templateUrl: './funcionario.component.html',
  styleUrls: ['./funcionario.component.scss']
})
export class FuncionarioComponent implements OnInit {

  empresas$: Observable<Empresa[]>;
  funcionarios$: Observable<Funcionario[]>;
  edit: boolean;
  displayDialogFuncionario: boolean;
  form: FormGroup;
  usuarioLogado: Usuario;
  cidades: any;
  pt: any;
  niveis: String[];


  constructor(
    private funcionarioService: FuncionarioService,
    private empresaService: EmpresaService,
    private fb: FormBuilder,
    private router: Router,
    private datePipe: DatePipe
  ) {
    this.usuarioLogado = this.router.getCurrentNavigation().extras.state['usuarioLogado']
  }

  ngOnInit() {
    this.empresas$ = this.empresaService.list();
    this.funcionarios$ = this.funcionarioService.list();
    this.configForm();
    this.configuraCalendario();
    this.configuraNiveis();
  }
  configuraNiveis() {
    this.niveis = ["Gerente","Operador"];
  }


  configForm() {
    this.form = this.fb.group({
      id: new FormControl(),
      rg: new FormControl('', Validators.required),
      cpf: new FormControl('', Validators.required),
      nome: new FormControl('', Validators.required),
      dataNascimento: new FormControl('', Validators.required),
      funcao: new FormControl('', Validators.required),
      horaExtra: new FormControl('', Validators.required),
      senha: new FormControl(''),
      nivelSistema: new FormControl(''),
      foto: new FormControl(''),
      celular: new FormControl(''),
      email: new FormControl(''),
      empresa: new FormControl('', Validators.required),
    })
  }

  setValorPadrao() {
    this.form.patchValue({
      horaExtra: false
    })
  }

  transformaSenha() {
    this.form.patchValue({
      senha: this.datePipe.transform(this.form.value["dataNascimento"], "ddMMyyyy")
    })
  }

  add() {
    this.form.reset();
    this.edit = false;
    this.displayDialogFuncionario = true;
    this.setValorPadrao()
  }

  selecionaFuncionario(depto: Funcionario) {
    this.edit = true;
    this.displayDialogFuncionario = true;
    this.form.setValue(depto);
  }

  save() {
    this.transformaSenha();
    this.funcionarioService.createOrUpdate(this.form.value)
      .then(() => {
        this.displayDialogFuncionario = false;
        Swal.fire(`Funcionario ${!this.edit ? 'salva' : 'atualizada'} com sucesso.`, '', 'success')
      })
      .catch((erro) => {
        this.displayDialogFuncionario = false;
        Swal.fire(`Erro ao ${!this.edit ? 'salvar' : 'atualizadar'} a Funcionario.`, `Detalhes: ${erro}`, 'error')
      })
    this.form.reset()
  }

  delete(depto: Funcionario) {
    Swal.fire({
      title: 'Confirma a exclusão da Funcionario?',
      text: "",
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não'
    }).then((result) => {
      if (result.value) {
        this.funcionarioService.delete(depto.id)
          .then(() => {
            Swal.fire('Funcionario excluído com sucesso!', '', 'success')
          })
      }
    })
  }

  configuraCalendario() {
    this.pt = {
      firstDayOfWeek: 0,
      dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
      dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
      dayNamesMin: ['Do', 'Se', 'Te', 'Qu', 'Qu', 'Se', 'Sa'],
      monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho',
        'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
      monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
      today: 'Hoje',
      clear: 'Limpar'
    };
  }
}
