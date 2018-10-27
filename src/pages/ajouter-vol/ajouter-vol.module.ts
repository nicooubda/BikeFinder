import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AjouterVolPage } from './ajouter-vol';

@NgModule({
  declarations: [
    AjouterVolPage,
  ],
  imports: [
    IonicPageModule.forChild(AjouterVolPage),
  ],
})
export class AjouterVolPageModule {}
