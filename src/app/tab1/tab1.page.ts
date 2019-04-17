import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { GroceriesService } from '../groceries.service';
import { InputDialogService } from '../input-dialog.service';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  constructor(public alertController: AlertController, public groceriesService: GroceriesService, public inputDialogService: InputDialogService, private socialSharing: SocialSharing) {
    groceriesService.dataChanged$.subscribe((dataChanged: boolean) => {
      this.loadItems();
    });
  }

  ngOnInit(){
    this.loadItems();
 }

  title = 'Grocery List';

  items$: Observable<object[]>;
  errorMsg: string;

  loadItems() {
    this.items$ = this.groceriesService.getItems()
  }

  removeItem(i: number) {
    this.items$ = this.groceriesService.removeItem(i);
  }

  addItem() {
    this.inputDialogService.showPrompt()
  }

  editItem(item: {name: string, quantity: number}, id: string) {
    this.inputDialogService.showPrompt(item, id)
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