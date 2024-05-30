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
const myRec =
  "https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886?key=6d693618-7b34-4bf1-ba2d-c5375c0770e5";

const showRecipe = async function () {
  try {
    const res = await fetch(myRec);
    const data = await res.json();
    console.log(res, data);
  } catch (error) {
    alert(error);
  }
};
showRecipe();
