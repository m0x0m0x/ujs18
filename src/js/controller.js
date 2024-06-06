// Import statements
import * as model from "./model.js";
import recipeView from "./views/recipeView.js";
import searchViews from "./views/searchView.js";
import resultsView from "./views/resultsView.js";
import paginationView from "./views/paginationView.js";
import bookmarksView from "./views/bookmarksView.js";
import addRecipeView from "./views/addRecipeView.js";

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

    // Results view to mark selected search result
    resultsView.update(model.getSearchResultsPage());

    // 3) Updating bookmarks view
    bookmarksView.update(model.state.bookmarks);

    //Loading recipe
    await model.loadRecipe(id);

    // 2 rendering recipe
    recipeView.render(model.state.recipe);
  } catch (error) {
    recipeView.renderError();
    console.error(error);
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
    resultsView.render(model.getSearchResultsPage());

    // 4 - Render initial pagination buttons
    paginationView.render(model.state.search);
  } catch (error) {
    console.log(error);
  }
};
// controlSearchResults();

// Buttons event delefation

const controlPagination = function (goToPage) {
  // Render new results in console.log
  // resultsView.render(model.state.search.results);
  resultsView.render(model.getSearchResultsPage(goToPage));

  // Render new paginatiom buttons
  paginationView.render(model.state.search);
};

// Update Recipe Servings
const controlServings = function (newServings) {
  // Update the recipe servings (in state)
  model.updateServings(newServings);

  // Upodate the recipe view
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};

// Control add bookmark
const controlAddBookmark = function () {
  // Add/Remove bok mark
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);

  // Update recipe view
  recipeView.update(model.state.recipe);

  // Render bookmarks
  bookmarksView.render(model.state.bookmarks);
};

const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};

const init = function () {
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addhandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchViews.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  // controlServings();
};
init();
