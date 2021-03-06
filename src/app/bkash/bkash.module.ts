import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { BkashPage } from './bkash.page';
import { CountdownModule } from 'ngx-countdown';

const routes: Routes = [
  {
    path: '',
    component: BkashPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CountdownModule,
    RouterModule.forChild(routes)
  ],
  declarations: [BkashPage]
})
export class BkashPageModule {}
