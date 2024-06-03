/*
This is the class for rendering the search results from the search view
*/

import View from "./View.js";

class ResultsView extends View {
  _parentElement = document.querySelector(".results");
  _errorMessage = "NoFucker DO again bastard";

  _generateMarkup() {
    return this._data.map(this.__generateMarkupPreview).join("");
  }

  __generateMarkupPreview(result) {
    const id = window.location.hash.slice(1);

    return `
    <li class="preview">
    <a class="preview__link ${
      result.id === id ? "preview__link--active" : ""
    }" href="#${result.id}">
      <figure class="preview__fig">
        <img src="${result.image}" alt="${result.title}" />
      </figure>
      <div class="preview__data">
        <h4 class="preview__title">${result.title}</h4>
        <p class="preview__publisher">${result.publisher}</p>
      </div>
    </a>
  </li>
  
    `;
  }
}

export default new ResultsView();
