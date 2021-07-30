import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {RecipeService} from '../recipe.service';
import {AlertController} from '@ionic/angular';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.page.html',
  styleUrls: ['./recipe-detail.page.scss'],
})
export class RecipeDetailPage implements OnInit {
  recipe;

  constructor(
      private activatedRoute: ActivatedRoute,
      private route: Router,
      private recipeService: RecipeService,
      private alertCtrl: AlertController) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      if (!paramMap.has('id')) {
        this.route.navigate(['/recipes']);
        return;
      } else {
        const id = paramMap.get('id');
        this.recipe = this.recipeService.getRecipe(id);
      }
    });
  }

    deleteRecipe(id: string) {
      this.alertCtrl.create({
          header: 'Are you sure?',
          message: 'Do you really want to delete the recipe?',
          buttons: [
              {
              text: 'Cancel',
              role: 'cancel'
              },
              {
              text: 'Delete',
              handler: () => {
                  this.recipeService.deleteRecipe(id);
                  this.route.navigate(['/recipes']);
              }
              }]
      }).then(alertEl => {
          alertEl.present();
      });

    }

}
