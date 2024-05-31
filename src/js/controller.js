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

const showRecipe = async function () {
  try {
    const res = await fetch(myRec2);
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} - ${res.status}`);

    console.log(res, data);

    //Formatting the response
    let { recipe } = data.data;
    recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };
  } catch (error) {
    alert(error);
  }
};
showRecipe();
