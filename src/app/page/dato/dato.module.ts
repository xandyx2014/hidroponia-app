import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DatoPage } from './dato.page';
import { ChartsModule } from 'ng2-charts';
const routes: Routes = [
  {
    path: '',
    component: DatoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChartsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DatoPage]
})
export class DatoPageModule {}
