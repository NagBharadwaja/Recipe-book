import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe';
import { RecipeItemComponent } from './recipe-item.component';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'rb-recipes-list',
  templateUrl: './recipes-list.component.html'
})
export class RecipesListComponent implements OnInit {

  recipes: Recipe[] = [];
  
  constructor(private recipeService: RecipeService) { 

  }

  ngOnInit() {
  	this.recipes = this.recipeService.getRecipes();
  }
}
