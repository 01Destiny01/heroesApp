import { NgModule } from '@angular/core';
import { ErrorPageComponent } from './shared/error-page/error-page.component';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { AuthGuard } from './auth/guards/auth.guard';

const routes: Routes = [
  {
    path: 'auth',
    //cuando alguien alguien entre a la ruta cargara a sus hijos
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  
  {
    path: 'heroes',
    //ruta a las que va a navegar
    loadChildren:() => import('./heroes/heroes.module').then(m=> m.HeroesModule),
    canLoad:[AuthGuard],
    canActivate:[AuthGuard]
  },
  {
    path: '404',
    component: ErrorPageComponent
  },

  {
    path: '**',
    redirectTo: '404'
  }
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes)

  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
