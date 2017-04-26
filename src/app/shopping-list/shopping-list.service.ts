import { Ingredient } from "../ingredient";

export class ShoppingListService {
  
  private items: Ingredient[] = [];
  
  public getItems(){
  	return this.items;
  }

  public addItems(items: Ingredient[]){
  	Array.prototype.push.apply(this.items, items);
  }

  public addItem(item: Ingredient){
    this.items.push(item);
  }

  public editItem(oldItem: Ingredient, newItem: Ingredient){
    this.items[this.items.indexOf(oldItem)] = newItem;
  }

  public deleteItem(item: Ingredient){
    this.items.splice(this.items.indexOf(item), 1);
  }

}
