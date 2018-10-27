import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetailPostePage } from './detail-poste';

@NgModule({
  declarations: [
    DetailPostePage,
  ],
  imports: [
    IonicPageModule.forChild(DetailPostePage),
  ],
})
export class DetailPostePageModule {}
