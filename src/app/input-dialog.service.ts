import { Injectable } from '@angular/core';
import { GroceriesService } from './groceries.service';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class InputDialogService {

  constructor(public groceriesService: GroceriesService, public alertController: AlertController) { }

  async showPrompt(item?: {name: string, quantity: number} , id?: string) {
    const prompt = await this.alertController.create({
      header: item === undefined ? 'Add grocery item' : 'Edit grocery item',
      inputs: [
        {
          name: 'name',
          id: 'name',
          type: 'text',
          placeholder: 'Name',
          value: item !== undefined ? item.name : null
        },
        {
          name: 'quantity',
          type: 'number',
          id: 'quantity',
          placeholder: 'Quantity',
          value: item !== undefined ? item.quantity : null
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
            if (id !== undefined) {
              this.groceriesService.editItem(data, id);
            } else {
              this.groceriesService.addItem(data);
            }
          }
        }
      ]
    });

    await prompt.present();
  }
}
