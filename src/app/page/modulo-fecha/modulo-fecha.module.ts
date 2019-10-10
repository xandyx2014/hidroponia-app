import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ModuloFechaPage } from './modulo-fecha.page';
import { BarchartComponent } from './barchart/barchart.component';
import { ChartsModule } from 'ng2-charts';

const routes: Routes = [
  {
    path: '',
    component: ModuloFechaPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ChartsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ModuloFechaPage, BarchartComponent]
})
export class ModuloFechaPageModule {}
