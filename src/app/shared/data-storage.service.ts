import { Injectable } from '@angular/core';
import { RecipeService } from '../recipes/recipe.service';
import { HttpClient } from '@angular/common/http';
import { Recipe } from '../recipes/recipe.model';
import { map } from 'rxjs';

@Injectable()
export class DataStorageService {
  constructor(private recipeService: RecipeService, private http: HttpClient) {}

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http
      .put(
        'https://recipe-app-1aa45-default-rtdb.firebaseio.com/recipes.json',
        recipes
      )
      .subscribe();
  }

  fetchRecipes() {
    this.http
      .get<Recipe[]>(
        'https://recipe-app-1aa45-default-rtdb.firebaseio.com/recipes.json'
      )
      .pipe(
        map((recipes) => {
          return recipes.map((recipe) => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : [],
            };
          });
        })
      )
      .subscribe((recipes) => {
        this.recipeService.setRecipes(recipes);
      });
  }
}
