import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {
  constructor(private shoppingListService: ShoppingListService) {}

  private recipes: Recipe[] = [
    // new Recipe(
    //   'Paneer Kadhai Masala',
    //   'A hot masala and spicy paneer kadhai, made with a host of spices and tomatoes, served with ajwain roti.',
    //   'https://c.ndtvimg.com/2019-09/tlps304o_paneer_625x300_24_September_19.jpg',
    //   [new Ingredient('Refined flour', 1), new Ingredient('Carom seeds', 2)]
    // ),
    // new Recipe(
    //   'Veg Cheese Burst Pizza',
    //   'A cheese burst that has Mozzarella cheese and Dairy Cheese Sauce which contains Cheddar cheese',
    //   'https://i.pinimg.com/originals/eb/ee/e8/ebeee82a42e0428d299f86ab74faf77a.jpg',
    //   [new Ingredient('Cheese', 1), new Ingredient('Dairy Cheese Sauce', 3)]
    // ),
    // new Recipe(
    //   'Mysore Masala Dosa',
    //   'The original Mysore Masala Dosa tastes special. And the speciality is in the whole spectrum, right from making the Batter, roasting the Dosa, the Masala paste applied on the Dosa and the Potato Curry.',
    //   'https://vismaifood.com/storage/app/uploads/public/8b4/19e/427/thumb__1200_0_0_0_auto.jpg',
    //   [
    //     new Ingredient('Byadgi chilli', 1),
    //     new Ingredient('Rice', 3),
    //     new Ingredient('Potatoes ', 3),
    //   ]
    // ),
    // new Recipe(
    //   'Kanda Poha',
    //   'Kanda Poha is a breakfast or a tea time snack popular in western India. It is made with flattened parboiled rice. Poha is prepared both as a sweet or spicy snack.',
    //   'https://www.bigfattummy.com/wp-content/uploads/2020/03/Kanda-Poha-09-1200x675.jpg',
    //   [new Ingredient('Green Chilles', 1), new Ingredient('Dry Poha', 3)]
    // ),
    // new Recipe(
    //   'Misal Pav',
    //   'Misal pav is a delectable Marathi dish which makes a great breakfast or brunch its a nice combination of curry and farsan served with pav a must try recipe.',
    //   'https://madhurasrecipe.com/wp-content/uploads/2020/10/Puneri-Misal-Marathi-Recipe-feature.jpg',
    //   [
    //     new Ingredient('Cheese', 1),
    //     new Ingredient('Matki', 3),
    //     new Ingredient('Farsan', 4),
    //   ]
    // ),
  ];

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
  }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(id: number) {
    return this.recipes[id];
  }

  addIngredientsToShoppingList(ingredientsAdded: Ingredient[]) {
    this.shoppingListService.addIngredientsToShoppingList(ingredientsAdded);
  }
}
