import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PostePage } from './poste';

@NgModule({
  declarations: [
    PostePage,
  ],
  imports: [
    IonicPageModule.forChild(PostePage),
  ],
})
export class PostePageModule {}
