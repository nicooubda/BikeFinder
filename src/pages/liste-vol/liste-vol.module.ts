import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListeVolPage } from './liste-vol';

@NgModule({
  declarations: [
    ListeVolPage,
  ],
  imports: [
    IonicPageModule.forChild(ListeVolPage),
  ],
})
export class ListeVolPageModule {}
