import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ChoosePaymentPage } from './choose-payment.page';

const routes: Routes = [
  {
    path: '',
    component: ChoosePaymentPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ChoosePaymentPage]
})
export class ChoosePaymentPageModule {}
