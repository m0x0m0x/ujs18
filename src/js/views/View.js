/* 
Related to the resultsview.js
*/

export default class View {
  _data;

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
}