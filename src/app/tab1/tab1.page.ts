import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { GroceriesService } from '../groceries.service';
import { InputDialogService } from '../input-dialog.service';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  constructor(public alertController: AlertController, public groceriesService: GroceriesService, public inputDialogService: InputDialogService, private socialSharing: SocialSharing) {}

  title = 'Grocery List';

  loadItems() {
    return this.groceriesService.getItems();
  }

  removeItem(i: number) {
    this.groceriesService.removeItem(i);
  }

  addItem() {
    this.inputDialogService.showPrompt()
  }

  editItem(item: {name: string, quantity: number}, i: number) {
    this.inputDialogService.showPrompt(item, i)
  }

  shareItem(item: {name: string, quantity: number}, i: number) {
    let message = 'Grocery item - Name: ' + item.name + ' - Quantity: ' + item.quantity;
    let subject = 'Shared via Groceries app';

    this.socialSharing.share(message, subject).then(() => {
      console.log('Shared successfully')
    }).catch((error) => {
      console.error('Error while sharing, ', error);
    });
  }
}