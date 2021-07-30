import {Component, OnDestroy, OnInit} from '@angular/core';
import {RecipeService} from './recipe.service';
import {Recipe} from './recipe.model';
import {Subscription} from 'rxjs/index';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.page.html',
  styleUrls: ['./recipes.page.scss'],
})
export class RecipesPage implements OnInit, OnDestroy {
    recipes: Recipe[];
    subs: Subscription;

  constructor(private recipeService: RecipeService) { }
  ngOnInit() {
    this.recipes = this.recipeService.getAllRecipes();
    this.subs = this.recipeService.recipesChanged.subscribe((recipes: Recipe[]) => {
        this.recipes = recipes;
    });
  }

  ngOnDestroy() {
      this.subs.unsubscribe();
  }
}
