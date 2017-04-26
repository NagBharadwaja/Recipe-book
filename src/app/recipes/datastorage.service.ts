import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';

import { RecipeService } from './recipe.service';
import { Recipe } from './recipe';

@Injectable()
export class DataStorageService{
    
    constructor(private http: Http, private recipeService: RecipeService){}

    storeRecipes(){
        return this.http.put('https://ng-recipe-book-82d84.firebaseio.com/recipes.json', this.recipeService.getRecipes())
    }

    getRecipes(){
        return this.http.get('https://ng-recipe-book-82d84.firebaseio.com/recipes.json')
        .map(
            (response: Response) => {
                const recipes: Recipe[] = response.json();
                if(!recipes['ingredients']){
                    recipes['ingredients'] = [];
                    console.log("INGRE", recipes[0]['name'], recipes[1]['name']);
                }
                return recipes;
            }
        )
        .subscribe(
            (recipes: Recipe[]) => {
                this.recipeService.setRecipes(recipes);
            }
        );
    }
}