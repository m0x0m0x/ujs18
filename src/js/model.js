/* 
model.js - From L293 
Model from he MVC architecture
*/

import { API_URL } from "./config.js";
import { getJSON } from "./helpers.js";

export const state = {
  recipe: {},
};

// state object
export const loadRecipe = async function (id) {
  try {
    const data = await getJSON(`${API_URL}/${id}`);

    //Formatting the response
    const { recipe } = data.data;
    recipe.image_url = recipe.image_url.replace("http://", "https://");
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: "Rapist",
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };
    console.log(state.recipe);
  } catch (err) {
    // Temporary error handling
    console.error(`${err}😡`);
  }
};
