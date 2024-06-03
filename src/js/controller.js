// Import statements
import * as model from "./model.js";
import recipeView from "./views/recipeView.js";
import searchViews from "./views/searchView.js";
import resultsView from "./views/resultsView.js";
import paginationView from "./views/paginationView.js";

// const recipeContainer = document.querySelector(".recipe");

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
    // console.log(id);

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
    recipeView.renderError();
  }
};
// controlRecipes();

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();
    // console.log(resultsView);

    //1- Get search query
    const query = searchViews.getQuery();
    if (!query) return;

    //2 - Load Search Results
    await model.loadSearchResults(query);

    //3 - Render results in console.log
    // resultsView.render(model.state.search.results);
    resultsView.render(model.getSearchResultsPage(4));

    // 4 - Render initial pagination buttons
    paginationView.render(model.state.search);
  } catch (error) {
    console.log(error);
  }
};
// controlSearchResults();

// Buttons event delefation

const controlPagination = function (goToPage) {
  console.log(goToPage);
};

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  searchViews.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
};
init();
