import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/public/login/login.component';
import { AuthguardService } from './services/authguard.service';


const routes: Routes = [
  { path: '', redirectTo: 'admin/painel', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'admin/painel', loadChildren: () => import('./components/admin/painel/painel.module').then(m => m.PainelModule), canActivate: [AuthguardService] },
  { path: 'admin/empresa', loadChildren: () => import('./components/admin/empresa/empresa.module').then(m => m.EmpresaModule), canActivate: [AuthguardService] },
  { path: 'admin/funcionario', loadChildren: () => import('./components/admin/funcionario/funcionario.module').then(m => m.FuncionarioModule), canActivate: [AuthguardService] },
  { path: 'admin/ponto/hoje', loadChildren: () => import('./components/admin/ponto/ponto-hoje/ponto-hoje.module').then(m => m.PontoHojeModule), canActivate: [AuthguardService] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
