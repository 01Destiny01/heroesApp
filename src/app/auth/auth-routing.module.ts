import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { HeroesModule } from '../heroes/heroes.module';

const routes: Routes = [
  {
    path: '',
    //ruta a las que va a navegar
    children: [
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'registro',
        component: RegistroComponent
      },
      {
        path: '**',
        redirectTo: 'login'
      }
    ]
  }

]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)

  ],
  exports:[ 
    RouterModule
  ]
})
export class AuthRoutingModule { }
