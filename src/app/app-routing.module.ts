import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    canLoad: [AuthGuard],
    loadChildren: () => import('./page/home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'hridroponias',
    loadChildren: () => import('./page/list/list.module').then(m => m.ListPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./page/login/login.module').then(m => m.LoginPageModule) },
  {
    path: 'hidroponia/:id',
    loadChildren: () => import('./page/hidroponia/hidroponia.module').then(m => m.HidroponiaPageModule)
  },
  { path: 'dato/:id',
   loadChildren: () => import('./page/dato/dato.module').then(m => m.DatoPageModule)
  },
  { path: 'modulo-fecha/:id', loadChildren: () => import('./page/modulo-fecha/modulo-fecha.module').then(m => m.ModuloFechaPageModule) },
  { path: 'pronostico', loadChildren: () => import('./page/pronostico/pronostico.module').then(m => m.PronosticoPageModule) },
  {
    path: '**', redirectTo: 'home'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
