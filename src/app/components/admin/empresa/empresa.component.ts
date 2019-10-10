import { Component, OnInit } from '@angular/core';
import { EmpresaService } from 'src/app/services/empresa.service';
import { Empresa } from 'src/app/models/empresa.model';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario.model';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.scss']
})
export class EmpresaComponent implements OnInit {

  empresas$: Observable<Empresa[]>;
  edit: boolean;
  displayDialogEmpresa: boolean;
  form: FormGroup;
  usuarioLogado: Usuario;


  constructor(
    private empresaService: EmpresaService,
    private fb: FormBuilder,
    private router: Router,
  ) {
    this.usuarioLogado = this.router.getCurrentNavigation().extras.state['usuarioLogado']
  }

  ngOnInit() {
    this.empresas$ = this.empresaService.list();
    this.configForm();
  }

  configForm() {
    this.form = this.fb.group({
      id: new FormControl(),
      cnpj: new FormControl('', Validators.required),
      nome: new FormControl('', Validators.required),
      cidade: new FormControl('', Validators.required),
      lat: new FormControl('', Validators.required),
      lng: new FormControl('', Validators.required),
      qtdLicenca: new FormControl('', Validators.required),
      telefone: new FormControl(''),
      contato: new FormControl(''),
    })
  }

  setValorPadrao() {
       this.form.patchValue({
        qtdLicenca: 1
      })
  }



  add() {
    this.form.reset();
    this.edit = false;
    this.displayDialogEmpresa = true;
    this.setValorPadrao()
  }

  selecionaEmpresa(depto: Empresa) {
    this.edit = true;
    this.displayDialogEmpresa = true;
    this.form.setValue(depto);
  }

  save() {
    this.empresaService.createOrUpdate(this.form.value)
      .then(() => {
        this.displayDialogEmpresa = false;
        Swal.fire(`Empresa ${!this.edit ? 'salva' : 'atualizada'} com sucesso.`, '', 'success')
      })
      .catch((erro) => {
        this.displayDialogEmpresa = false;
        Swal.fire(`Erro ao ${!this.edit ? 'salvar' : 'atualizadar'} a Empresa.`, `Detalhes: ${erro}`, 'error')
      })
    this.form.reset()
  }

  delete(depto: Empresa) {
    Swal.fire({
      title: 'Confirma a exclusão da Empresa?',
      text: "",
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não'
    }).then((result) => {
      if (result.value) {
        this.empresaService.delete(depto.id)
          .then(() => {
            Swal.fire('Empresa excluído com sucesso!', '', 'success')
          })
      }
    })
  }
}
