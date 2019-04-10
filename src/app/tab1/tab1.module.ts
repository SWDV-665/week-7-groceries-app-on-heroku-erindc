import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import { GroceriesService } from '../groceries.service';
import { InputDialogService } from '../input-dialog.service';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: Tab1Page }])
  ],
  providers: [
    GroceriesService,
    InputDialogService
  ],
  declarations: [Tab1Page]
})
export class Tab1PageModule {}
