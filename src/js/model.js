/* 
model.js - From L293 
Model from he MVC architecture
*/

import { API_URL, RES_PER_PAGE } from "./config.js";
import { getJSON } from "./helpers.js";

// State contains all data to build appliation
export const state = {
  recipe: {},
  search: {
    query: "",
    results: [],
    resultsPerPage: RES_PER_PAGE,
    page: 1,
  },
  bookmarks: [],
};

// state object
export const loadRecipe = async function (id) {
  try {
    const data = await getJSON(`${API_URL}${id}`);

    //Formatting the response
    const { recipe } = data.data;
    recipe.image_url = recipe.image_url.replace("http://", "https://");
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };

    if (state.bookmarks.some((bookmark) => bookmark.id === id))
      state.recipe.bookmarked = true;
    else state.recipe.bookmarked = false;

    console.log(recipe);
  } catch (err) {
    // Temporary error handling
    console.error(`${err}😡`);
    throw err;
  }
};

// Implementing the search functionality
export const loadSearchResults = async function (query) {
  try {
    state.search.query = query;
    const data = await getJSON(`${API_URL}?search=${query}`);

    // Here this state variable is extracting data from the api
    state.search.results = data.data.recipes.map((rec) => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image_url,
      };
    });
    state.search.page = 1;
  } catch (err) {
    console.error(`${err}😡`);
    throw err;
  }
};

// Pagination section
export const getSearchResultsPage = function (page = state.search.page) {
  state.search.page = page;

  // common method of pagination
  const start = (page - 1) * state.search.resultsPerPage; //0;
  const end = page * state.search.resultsPerPage; //9;

  return state.search.results.slice(start, end);
};

//Updating recipe code
export const updateServings = function (newServings) {
  state.recipe.ingredients.forEach((ing) => {
    ing.quantity = (ing.quantity * newServings) / state.recipe.servings;
    // newQt = oldQt * newServings / oldServings
  });

  state.recipe.servings = newServings;
};

// storing book mark into local storage
const persistBookmarks = function () {
  // Note this line will make the data available in local storae
  localStorage.setItem("bookmarks", JSON.stringify(state.bookmarks));
};

// Bookmark Function
export const addBookmark = function (recipe) {
  //add bookmark
  state.bookmarks.push(recipe);

  // Mark current recipe as bookmark
  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;
  persistBookmarks();
};

// Remove bookmark
export const deleteBookmark = function (id) {
  //Delete Bookmark
  const index = state.bookmarks.findIndex((el) => el.id === id);
  state.bookmarks.splice(index, 1);

  // UnMark current recipe as bookmark
  if (id === state.recipe.id) state.recipe.bookmarked = false;
  persistBookmarks();
};

// Getting the local storage back into bookmarks
const init = function () {
  const storage = localStorage.getItem("bookmarks");
  if (storage) state.bookmarks = JSON.parse(storage);
};
// init();
// console.log(state.bookmarks);

// Debugging function
const clearBookmarks = function () {
  localStorage.clear("bookmarks");
};
clearBookmarks();

// Upload Recipee Functton
/*
https://forkify-api.herokuapp.com/v2
Pakey - 6d693618-7b34-4bf1-ba2d-c5375c0770e5
Example URL:https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886?key=<insert your key>
*/

export const uploadRecipe = async function (newRecipe) {
  console.log(Object.entries(newRecipe));
  try {
    const ingredients = Object.entries(newRecipe)
      .filter((entry) => entry[0].startsWith("ingredient") && entry[1] != "")
      .map((ing) => {
        const ingArr = ing[1].replaceAll("", "").split(",");
        if (ingArr.length !== 3)
          throw new Error("Fukr wrong formation , use right format !");
        const [quantity, unit, description] = ingArr;
        return { quantity: quantity ? +quantity : null, unit, description };
      });
    console.log(ingredients);
  } catch (error) {
    throw error;
  }
};
