/* 
model.js - From L293 
Model from he MVC architecture
*/

export const state = {
  recipe: {},
};

// state object
export const loadRecipe = async function (id) {
  try {
    const res = await fetch(
      `https://forkify-api.herokuapp.com/api/v2/recipes/${id}key=6d693618-7b34-4bf1-ba2d-c5375c0770e5`
    );
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} - ${res.status}`);

    console.log(res, data);

    //Formatting the response
    const { recipe } = data.data;
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
    alert(err);
  }
};
