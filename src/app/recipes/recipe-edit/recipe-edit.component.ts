import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { FormArray, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe';


@Component({
  selector: 'rb-recipe-edit',
  templateUrl: './recipe-edit.component.html'
})
export class RecipeEditComponent implements OnInit, OnDestroy {

  private recipeForm: FormGroup;
  private recipeIndex: number;
  private recipe: Recipe;
  private subscription: Subscription;
  private isNew = true;
  constructor(private route: ActivatedRoute, 
              private recipeService: RecipeService,
              private formBuilder: FormBuilder,
              private router: Router) { }
  
  private initForm(){
    let recipeName = '';
    let recipeImageUrl = '';
    let recipeContent = '';
    let recipeIngredients: FormArray = new FormArray([]);

    if(!this.isNew){
      for(let i=0; i < this.recipe.ingredients.length; i++){
        recipeIngredients.push(
          new FormGroup({
            name: new FormControl(this.recipe.ingredients[i].name, Validators.required),
            amount: new FormControl(this.recipe.ingredients[i].amount, 
                    [Validators.required,
                    Validators.pattern("\\d+")])
          })
        );
        recipeName = this.recipe.name;
        recipeImageUrl = this.recipe.imagePath;
        recipeContent = this.recipe.description; 
      }
    }
    this.recipeForm = this.formBuilder.group({
      name: [recipeName, Validators.required],
      imagePath: [recipeImageUrl, Validators.required],
      description: [recipeContent, Validators.required],
      ingredients: recipeIngredients
    });
  }

  ngOnInit() {
    this.isNew = true;
    
    this.subscription = this.route.params.subscribe(
        (params: any) => {
          if(params.hasOwnProperty('id')){
            this.isNew = false;
            this.recipeIndex = +params['id'];
            this.recipe = this.recipeService.getRecipe(this.recipeIndex);
          }else{
            this.isNew = true;
            this.recipe = null;
          }
          this.initForm();
        }
    );
    //console.log(this.isNew);
  }

  onSubmit(){
    if(this.isNew){
      this.recipeService.addRecipe(this.recipeForm.value);
    }else{
      this.recipeService.editRecipe(this.recipe, this.recipeForm.value);
    }
    this.navigateBack();
  }

  onCancel(){
    this.navigateBack();
  }

  navigateBack(){
    this.router.navigate(["../"]);
  }

  addIngredient(name: string, amount: string){
    (<FormArray>this.recipeForm.controls['ingredients']).push(
      new FormGroup({
        name: new FormControl(name, Validators.required),
        amount: new FormControl(
                amount, 
                [Validators.required,
                Validators.pattern("\\d+")]
          )
      })
    );
  }

  removeIngredient(index: number){
    (<FormArray>this.recipeForm.controls['ingredients']).removeAt(index);
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  

}
