import { PontoService } from 'src/app/services/ponto.service';
import { FuncionarioService } from './../../../../services/funcionario.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Funcionario } from 'src/app/models/funcionario.model';
import { Subject, Observable } from 'rxjs';
import { Ponto } from 'src/app/models/ponto.model';
import Swal from 'sweetalert2';
import * as moment from 'moment';
import { takeUntil } from 'rxjs/operators';
import { PontoMes } from 'src/app/models/ponto-mes.model';
import { PontoRelatorio } from 'src/app/models/ponto-relatorio.model';

declare const require: any;
const jsPDF = require('jspdf');
require('jspdf-autotable');


@Component({
  selector: 'app-ponto-relatorio',
  templateUrl: './ponto-relatorio.component.html',
  styleUrls: ['./ponto-relatorio.component.scss']
})
export class PontoRelatorioComponent implements OnInit {
  usuarioLogado: Funcionario;
  private unsubscribe$: Subject<any> = new Subject();

  inicio: Date;
  fim: Date;
  funcionarios$: Observable<Funcionario[]>;
  pontos$: Observable<Ponto[]>;
  pontosLista: Ponto[];
  funcionarioSelecionado: Funcionario;
  dlgResultado: boolean;
  mesAno: string;
  pontoMes: PontoMes;
  pontosRelatorio: any;
  totalMesHorasTrabalhadas: any = 0;
  totalMesMinutosTrabalhados: any = 0;
  totalMesMinutosNegativosTrabalhados: number = 0;
  totalMesMinutosPositivosTrabalhados: number = 0;


  constructor(private router: Router,
    private pontoService: PontoService,
    private spinner: NgxSpinnerService,
    private funcionarioService: FuncionarioService) {
    this.usuarioLogado = this.router.getCurrentNavigation().extras.state['usuarioLogado']

  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  ngOnInit() {
    moment.locale('pt-BR');
    const date = new Date();
    this.inicio = new Date(date.getFullYear(), date.getMonth(), 1, 0, 0, 0);
    this.fim = new Date(date.getFullYear(), date.getMonth() + 1, 0, 23, 59, 59);
    this.mesAno = moment(this.inicio).format('MMM_YYYY') // Recupera todos os Relatorios Impressos Mes Atual
  }

  mudaMes($event) {
    if (!this.funcionarioSelecionado) {
      Swal.fire({ type: 'error', title: 'Selecione o funcionario!', showConfirmButton: false, timer: 2000 })
      return
    }

    this.spinner.show()
    if ($event) {
      if ($event.srcElement.valueAsDate) {
        var date = $event.srcElement.valueAsDate
        this.inicio = new Date(date.getFullYear(), date.getMonth() + 1, 1, 0, 0, 0);
        this.fim = new Date(date.getFullYear(), date.getMonth() + 2, 0, 23, 59, 59);
      } else {
        date = new Date();
        this.inicio = new Date(date.getFullYear(), date.getMonth(), 1, 0, 0, 0);
        this.fim = new Date(date.getFullYear(), date.getMonth() + 1, 0);
      }
    }

    this.pontoService.consultaPontoByPeriodoFuncionario(this.inicio, this.fim, this.funcionarioSelecionado.id)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(lista => {
        this.pontosLista = lista.reverse();
        this.spinner.hide()
      })

  }


  selecionaFuncionario(funcionario: Funcionario) {
    this.spinner.show();
    this.pontoMes = new PontoMes();
    this.funcionarioSelecionado = funcionario;
    this.dlgResultado = false;
    this.pontoService.consultaPontoByPeriodoFuncionario(this.inicio, this.fim, this.funcionarioSelecionado.id)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(lista => {
        this.pontosLista = lista.reverse();
        this.spinner.hide();
      })
  }

  consultaNome(event) {
    this.spinner.show()
    let query: string = event.target.value;
    if (query.length >= 3) {
      this.funcionarios$ = this.funcionarioService.consultaPessoaPeloNome(query)
    }
    else {
      this.funcionarios$ = null
    }
    this.dlgResultado = true;
    this.spinner.hide()
  }

  imprimirPontoFuncionario() {
    this.spinner.show()
    this.totalMesMinutosPositivosTrabalhados = 0;
    this.totalMesMinutosNegativosTrabalhados = 0;
    this.totalMesMinutosTrabalhados = 0;
    this.totalMesHorasTrabalhadas = 0;
    let month = moment(this.inicio).format('MMMM');
    let year = moment().format('YYYY');
    let doc = new jsPDF('p', 'pt');
    var columns = [
      { title: "Dia", dataKey: "dataPontoFormatado" },
      { title: "Data", dataKey: "dataPonto" },
      { title: "Entrada", dataKey: "primeiro" },
      { title: "Saída", dataKey: "segundo" },
      { title: "Entrada", dataKey: "terceiro" },
      { title: "Saída", dataKey: "quarto" },
      { title: "Obs", dataKey: "justificativa" },



    ];
    if (this.funcionarioSelecionado.horaExtra) {
      columns.push({ title: "Total", dataKey: "total" })
      columns.push({ title: "Saldo", dataKey: "dif" })
    }
    let list: any = [];
    this.pontosLista.map(p => {

      let relatorio = new PontoRelatorio()
      relatorio.dataPonto = moment(p.dataPonto.toDate()).format("DD/MM/YYYY")
      relatorio.dataPontoFormatado = moment(p.dataPonto.toDate()).format("DD");
      relatorio.funcionario = `${p.nome}`
      relatorio.justificativa = p.justificativa || '';
      relatorio.primeiro = (p.primeiraBatida) ? moment(p.primeiraBatida.toDate()).format("HH:mm:ss") : '';
      relatorio.segundo = (p.segundaBatida) ? moment(p.segundaBatida.toDate()).format("HH:mm:ss") : '';
      relatorio.terceiro = (p.terceiraBatida) ? moment(p.terceiraBatida.toDate()).format("HH:mm:ss") : '';
      relatorio.quarto = (p.quartaBatida) ? moment(p.quartaBatida.toDate()).format("HH:mm:ss") : '';
      if (this.funcionarioSelecionado.horaExtra) {
        if (p.primeiraBatida && p.segundaBatida) {
          relatorio.total = this.calculaDuracao(p.primeiraBatida, p.segundaBatida, p.terceiraBatida, p.quartaBatida)
          var duracao = moment.duration(relatorio.total);
          relatorio.dif = this.calculaDif(duracao.get('hour'), duracao.get('minute'));
        }
      }
      if (p.ocorrencia) {
        // o tipo de ocorrencia
        relatorio.primeiro = p.tipoOcorrencia
      }
      list.push(relatorio)
    })
    // Exibi o total
    //console.log("Total de Horas Trabalhadas: " + this.totalMesHorasTrabalhadas.get('hours') + ":" + (this.totalMesHorasTrabalhadas.get('minute') % 60));
    doc.setFontSize(8);
    doc.autoTable(columns, list,
      {
        tableWidth: 'auto',
        margin: { top: 120, left: 10, right: 10 },
        styles: {
          overflow: 'linebreak',
          fontSize: 8.5,
          cel: 'wrap'
        },
        columnStyles: {
          total: { halign: 'left' },
          dif: { halign: 'left' },

        },

        didDrawPage: () => {
          doc.setFontSize(18);
          doc.setFontType('bold')
          doc.rect(35, 15, 300, 100) // Primeiro quadro
          doc.rect(335, 15, 219, 100) // Segundo quadro
          doc.text(40, 40, "FOLHA PONTO ");
          doc.setFontSize(12);
          doc.setFontType('normal')
          doc.text(40, 60, this.funcionarioSelecionado.nome);
          doc.setFontSize(8);

          (this.usuarioLogado.empresa) ? doc.text(40, 90, this.usuarioLogado.empresa.nome) : doc.text(40, 90, 'NOME DA EMPRESA');
          // Dados do 2 Quadro
          doc.setFontType('bold')
          //doc.text(415, 25, 'Periodo: ' + this.periodo.toUpperCase());
          doc.text(415, 45, 'Mês: ' + month.toUpperCase());
          doc.text(415, 65, 'Ano: ' + year);
          doc.setFontType('normal')
          doc.text(415, 100, 'Carimbo da Empresa');
          // Observacoes
          doc.setFontType('normal')
          if (typeof this.pontoMes.observacao != 'undefined') {
            doc.text(40, 620, 'Observações: ' + this.pontoMes.observacao);
          }
          if (this.funcionarioSelecionado.horaExtra) {

            if (typeof this.totalMesHorasTrabalhadas != 'undefined') {
              console.log(`Minutos + ${this.totalMesMinutosPositivosTrabalhados} `);
              console.log(`Minutos - ${this.totalMesMinutosNegativosTrabalhados} `);
              this.totalMesMinutosTrabalhados = this.totalMesMinutosNegativosTrabalhados - this.totalMesMinutosPositivosTrabalhados;
              console.log(this.totalMesMinutosTrabalhados);
              doc.text(40, 680, 'Total de Saldo: ' + (this.totalMesHorasTrabalhadas + Math.round(this.totalMesMinutosTrabalhados / 60)) + ":" + (this.totalMesMinutosTrabalhados % 60));
            }
          }
          // Assinatura
          doc.setLineWidth(0.5)
          doc.line(40, 708, 250, 708)
          doc.text(40, 720, this.funcionarioSelecionado.nome);
          doc.text(40, 735, this.funcionarioSelecionado.funcao);
          doc.text(40, 750, (this.funcionarioSelecionado.rg) ? this.funcionarioSelecionado.rg : 'Não cadastrado');
          // Rodape
          doc.setFontSize(8);
          doc.text(40, 800, 'Relatório gerado a partir do registro no Sistema Informatizado Cheguei na Hora - Empresa. Impresso em ' + moment().format('L HH:mm'))
        }
      })
    let nome = this.funcionarioSelecionado.nome.replace(/\s/g, '_');
    month = moment().format('MMM_YYYY');
    doc.save(nome.toLowerCase() + "_" + month + ".pdf");
    this.spinner.hide();
  }

  calculaDuracao(primeira: any, segunda: any, terceira?: any, quarta?: any) {
    let dif1 = moment(segunda.toDate()).diff(primeira.toDate())
    var d = moment.duration(dif1);
    let s;
    if (terceira && quarta) {
      let dif2 = moment(quarta.toDate()).diff(terceira.toDate())
      var d2 = moment.duration(dif2);
      let total = d.add(d2)
      s = Math.floor(total.asHours()) + moment.utc(dif2).format(":mm");
      return s;
    } else {
      s = Math.floor(d.asHours()) + moment.utc(dif1).format(":mm");
      return s;
    }
    return '';
  }

  calculaDif(horas: number, minutos: number) {
    const horasPadrao = moment(new Date(0, 0, 0, 8));
    const horasTrabalhadas = new Date(0, 0, 0, horas, minutos);
    let dif1 = moment(horasTrabalhadas).diff(horasPadrao)
    var d = moment.duration(dif1);
    let s;
    if (d.asHours() >= 0) {
      s = Math.floor(d.asHours()) + ":" + (d.asMinutes() % 60);
      console.log("Positivo")
      this.totalMesHorasTrabalhadas = this.totalMesHorasTrabalhadas + Math.floor(d.asHours());
      this.totalMesMinutosPositivosTrabalhados = this.totalMesMinutosPositivosTrabalhados + Math.floor(d.asMinutes() % 60);
      console.log(this.totalMesHorasTrabalhadas + ":" + this.totalMesMinutosPositivosTrabalhados);

    } else {
      s = Math.ceil(d.asHours()) + ":" + Math.abs(d.asMinutes() % 60);
      console.log("Negativo")
      console.log(Math.ceil(d.asHours()))
      this.totalMesHorasTrabalhadas = this.totalMesHorasTrabalhadas - Math.abs(Math.ceil(d.asHours()));
      this.totalMesMinutosNegativosTrabalhados = this.totalMesMinutosNegativosTrabalhados + Math.abs(Math.ceil(d.asMinutes() % 60));
      console.log(Math.ceil(d.asMinutes() % 60))
      console.log(Math.abs(d.asMinutes() % 60))

      console.log(this.totalMesHorasTrabalhadas + ":" + (this.totalMesMinutosNegativosTrabalhados));
    }

    return s;
  }


}
