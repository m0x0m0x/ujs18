// Import statements
import * as model from "./model.js";
import recipeView from "./views/recipeView.js";

const recipeContainer = document.querySelector(".recipe");

/*
https://forkify-api.herokuapp.com/v2
Pakey - 6d693618-7b34-4bf1-ba2d-c5375c0770e5
Example URL:https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886?key=<insert your key>
*/
///////////////////////////////////////

// Start fetcg reqyest

// Fetch variable

// This key required for deleting a recipee

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    console.log(id);

    //guardclause
    if (!id) return;
    recipeView.renderSpinner();

    //Loading recipe
    await model.loadRecipe(id);

    // 2 rendering recipe
    recipeView.render(model.state.recipe);

    console.log("Printing the destructured");
    console.log(model.state.recipe);
  } catch (error) {
    alert(error);
  }
};
controlRecipes();

// Listening for the hashes, which is listening for an event

// This code is optimized below
// window.addEventListener("hashchange", controlRecipes);
// window.addEventListener("load", controlRecipes);

["hashchange", "load"].forEach((ev) =>
  window.addEventListener(ev, controlRecipes)
);
