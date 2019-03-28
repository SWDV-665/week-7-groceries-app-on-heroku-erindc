import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  constructor(public alertController: AlertController) {}

  title = 'Grocery List';

  items = [
    {
      name: 'Milk',
      quantity: 2,
    },
    {
      name: 'Bread',
      quantity: 1,
    },
    {
      name: 'Banana',
      quantity: 4,
    },
    {
      name: 'Sugar',
      quantity: 1,
    }
  ];

  removeItem(i: number) {
    this.items.splice(i, 1)
  }

  addItem() {
    this.showAddItemPrompt()
  }

  async showAddItemPrompt() {
    const addItemPrompt = await this.alertController.create({
      header: 'Add grocery item',
      inputs: [
        {
          name: 'name',
          id: 'name',
          type: 'text',
          placeholder: 'Name'
        },
        {
          name: 'quantity',
          type: 'number',
          id: 'quantity',
          placeholder: 'Quantity'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: (data) => {
            this.items.push(data);
          }
        }
      ]
    });

    await addItemPrompt.present();
  }
}
