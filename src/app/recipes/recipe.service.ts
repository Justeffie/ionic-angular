import { Injectable } from '@angular/core';
import {Recipe} from './recipe.model';
import {Subject} from 'rxjs/index';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
    private recipes: Recipe[] = [
        {
            id: 'r1',
            title: 'Schnitzel',
            imageUrl: 'https://bit.ly/2EOXfN6',
            ingredients: ['French Fries', 'Pork Meat', 'Salad']
        },
        {
            id: 'r2',
            title: 'Spaghetti',
            imageUrl: 'https://bit.ly/2nI7iOF',
            ingredients: ['Meat', 'Tomato', 'Spaghetti']
        }
    ];
    recipesChanged = new Subject<Recipe[]>();
  constructor() { }

  getAllRecipes() {
      this.recipesChanged.next(this.recipes);
      return this.recipes.slice();
  }

  getRecipe(id: string) {
      return {...this.recipes.find((recipe) => {
          return recipe.id === id;
      })};
  }
  deleteRecipe(id: string) {
      this.recipes = this.recipes.filter(recipe => {
          return recipe.id !== id;
      });
      this.recipesChanged.next(this.recipes);
  }
}
