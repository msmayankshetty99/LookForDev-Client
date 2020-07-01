import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SigninComponent } from './signin/signin.component';
import { HomeComponent } from './home/home.component';
import { DevComponent } from './dev/dev.component';
import { CompanyComponent } from './company/company.component';
import { AuthGuard } from './helpers/auth.guard';
import { Role } from './models/role'

const routes: Routes = [
  { path:'signin', component: SigninComponent },
  { path:'home', component: HomeComponent },
  { path: 'dev', component: DevComponent, canActivate: [AuthGuard], data: { roles: [Role.Dev] } },
  { path: 'company', component: CompanyComponent, canActivate: [AuthGuard], data: { roles: [Role.Company] } },
  { path:'', redirectTo:'/home', pathMatch:'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [ 
  SigninComponent, 
  HomeComponent, 
  DevComponent, 
  CompanyComponent 
]
