import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();

  constructor(private shoppingListService: ShoppingListService) {}

  private recipes: Recipe[] = [
    new Recipe(
      'Paneer Kadhai Masala',
      'A hot masala and spicy paneer kadhai, made with a host of spices and tomatoes, served with ajwain roti.',
      'https://c.ndtvimg.com/2019-09/tlps304o_paneer_625x300_24_September_19.jpg',
      [new Ingredient('Refined flour', 1), new Ingredient('Carom seeds', 2)]
    ),
    new Recipe(
      'Veg Cheese Burst Pizza',
      'A cheese burst that has Mozzarella cheese and Dairy Cheese Sauce which contains Cheddar cheese',
      'https://i.pinimg.com/originals/eb/ee/e8/ebeee82a42e0428d299f86ab74faf77a.jpg',
      [new Ingredient('Cheese', 1), new Ingredient('Dairy Cheese Sauce', 3)]
    ),
  ];

  getRecipes() {
    return this.recipes.slice();
  }

  addIngredientsToShoppingList(ingredientsAdded: Ingredient[]) {
    this.shoppingListService.addIngredientsToShoppingList(ingredientsAdded);
  }
}
