import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import {FlexLayoutModule} from '@angular/flex-layout';
import { PronosticoPage } from './pronostico.page';

const routes: Routes = [
  {
    path: '',
    component: PronosticoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FlexLayoutModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PronosticoPage]
})
export class PronosticoPageModule {}
