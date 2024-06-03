/* 
Views from the MVC architecture
*/

import View from "./View.js";

class RecipeView {
  _parentElement = document.querySelector(".recipe");
  _data;
  _errorMessage = `Recipe Not Found`;
  _message = "";

  render(data) {
    this._data = data;
    const markup = this._generateMarkup();
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  _clear() {
    this._parentElement.innerHTML = "";
  }

  renderSpinner() {
    const markup = `
        <div class="spinner">
              <svg>
                <use href="src/img/icons.svg#icon-loader"></use>
              </svg>
        </div>
      `;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  renderError(msg = this._errorMessage) {
    const markup = `
    <div class="error">
    <div>
    <svg>
    <use href="src/img/icons.svg#icon-alert-triangle"></use>
    </svg>
    </div>
    <p>${msg}</p>
    </div> 
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  renderMessage(msg = this._message) {
    const markup = `
    <div class="message">
    <div>
    <svg>
    <use href="src/img/icons.svg#icon-smile"></use>
    </svg>
    </div>
    <p>${msg}</p>
    </div> 
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  // add handler render method
  addHandlerRender(handler) {
    ["hashchange", "load"].forEach((ev) =>
      window.addEventListener(ev, handler)
    );
  }
  _generateMarkup() {
    console.log(this._data);
    return `
      <figure class="recipe__fig">
            <img src="${this._data.image}" alt="${
      this._data.title
    }" class="recipe__img" />
            <h1 class="recipe__title">
              <span>${this._data.title}</span>
            </h1>
          </figure>

          <div class="recipe__details">
            <div class="recipe__info">
              <svg class="recipe__info-icon">
                <use href="src/img/icons.svg#icon-clock"></use>
              </svg>
              <span class="recipe__info-data recipe__info-data--minutes">${
                this._data.cookingTime
              }</span>
              <span class="recipe__info-text">minutes</span>
            </div>
            <div class="recipe__info">
              <svg class="recipe__info-icon">
                <use href="src/img/icons.svg#icon-users"></use>
              </svg>
              <span class="recipe__info-data recipe__info-data--people">${
                this._data.servings
              }</span>
              <span class="recipe__info-text">servings</span>

              <div class="recipe__info-buttons">
                <button class="btn--tiny btn--increase-servings">
                  <svg>
                    <use href="src/img/icons.svg#icon-minus-circle"></use>
                  </svg>
                </button>
                <button class="btn--tiny btn--increase-servings">
                  <svg>
                    <use href="src/img/icons.svg#icon-plus-circle"></use>
                  </svg>
                </button>
              </div>
            </div>

            <div class="recipe__user-generated">
              <svg>
                <use href="src/img/icons.svg#icon-user"></use>
              </svg>
            </div>
            <button class="btn--round">
              <svg class="">
                <use href="src/img/icons.svg#icon-bookmark-fill"></use>
              </svg>
            </button>
          </div>

          <div class="recipe__ingredients">
            <h2 class="heading--2">Recipe ingredients</h2>
            <ul class="recipe__ingredient-list">
              ${this._data.ingredients
                .map(this._generateMarkupIngredient)
                .join("")}
          </div>

          <div class="recipe__directions">
            <h2 class="heading--2">How to cook it</h2>
            <p class="recipe__directions-text">
              This this._data was carefully designed and tested by
              <span class="recipe__publisher">${
                this._data.publisher
              }</span>. Please check out
              directions at their website.
            </p>
            <a
              class="btn--small recipe__btn"
              href="${this._data.sourceUrl}"
              target="_blank"
            >
              <span>Directions</span>
              <svg class="search__icon">
                <use href="src/img/icons.svg#icon-arrow-right"></use>
              </svg>
            </a>
          </div>
    `;
  }
  _generateMarkupIngredient(ing) {
    return `
    <li class="recipe__ingredient">
    <svg class="recipe__icon">
      <use href="src/img/icons.svg#icon-check"></use>
    </svg>
    <div class="recipe__quantity">${ing.quantity}</div>
    <div class="recipe__description">
      <span class="recipe__unit">${ing.unit}</span>
      ${ing.description}
    </div>
  </li>
  `;
  }
}

export default new RecipeView();
