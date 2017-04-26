import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../ingredient';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'rb-shopping-list',
  templateUrl: './shopping-list.component.html'
})
export class ShoppingListComponent implements OnInit {

	selectedItem: Ingredient = null;
  items: Ingredient[] = [];

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
  	this.items = this.shoppingListService.getItems();
  }

  onSelectItem(item: Ingredient){
    this.selectedItem = item;
  }

  onClearItem(){
    this.selectedItem = null;
  }

}
