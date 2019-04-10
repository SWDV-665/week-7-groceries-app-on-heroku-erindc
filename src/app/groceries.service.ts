import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GroceriesService {

  constructor() {
    console.log("Groceries service")
   }

   items = [];

  getItems() {
    return this.items;
  }

  removeItem(i: number) {
    this.items.splice(i, 1)
  }

  addItem(item: {name: string, quantity: number}) {
    console.log(item);
    this.items.push(item);
  }

  editItem(item: {name: string, quantity: number}, index: number) {
    this.items[index] = item;
  }
}
