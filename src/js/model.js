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
