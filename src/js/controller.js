// Import statements
import * as model from "./model.js";
import recipeView from "./views/recipeView.js";

const recipeContainer = document.querySelector(".recipe");

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

/*
https://forkify-api.herokuapp.com/v2
Pakey - 6d693618-7b34-4bf1-ba2d-c5375c0770e5
Example URL:https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886?key=<insert your key>
*/
///////////////////////////////////////

// Start fetcg reqyest

// Fetch variable

// This key required for deleting a recipee
const myRec =
  "https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886?key=6d693618-7b34-4bf1-ba2d-c5375c0770e5";

const myRec2 =
  "https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886";

const myRecWrong =
  "https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886xxxx";

const myR2 =
  "https://forkify-api.herokuapp.com/api/v2/recipes/664c8f193e7aa067e94e8706";

const renderSpinner = function (parentEl) {
  const markup = `
      <div class="spinner">
            <svg>
              <use href="src/img/icons.svg#icon-loader"></use>
            </svg>
      </div>
    `;
  parentEl.innerHTML = "";
  parentEl.insertAdjacentHTML("afterbegin", markup);
};

const showRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    console.log(id);

    //guardclause
    if (!id) return;
    renderSpinner(recipeContainer);

    //Loading recipe
    await model.loadRecipe(id);

    // 2 rendering recipe
    recipeView.render(model.state.recipe);

    console.log("Printing the destructured");
    console.log(recipe);
  } catch (error) {
    alert(error);
  }
};
showRecipe();

// Listening for the hashes, which is listening for an event

// This code is optimized below
// window.addEventListener("hashchange", showRecipe);
// window.addEventListener("load", showRecipe);

["hashchange", "load"].forEach((ev) => window.addEventListener(ev, showRecipe));
