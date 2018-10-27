import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListePostePage } from './liste-poste';

@NgModule({
  declarations: [
    ListePostePage,
  ],
  imports: [
    IonicPageModule.forChild(ListePostePage),
  ],
})
export class ListePostePageModule {}
