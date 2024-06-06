/* 
Related to the resultsview.js
*/

export default class View {
  _data;

  /**
   * Render received object to the dom
   * @param {Object | Objectp[]} data The data to be rendered (eg Pussy)
   * @param {boolean} [render=true] if False crate markup sting , instead of rendering to the dom
   * @returns {undefined | string} A markup string is retuned if false
   * @this {Object} View Instance
   * @m0x0m0x - BootyDance
   * @todo - Smell her pussy
   */
  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data;
    const markup = this._generateMarkup();

    if (!render) return markup;

    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  // --Update method---
  update(data) {
    // if (!data || (Array.isArray(data) && data.length === 0))
    //   return this.renderError();

    this._data = data;
    const newMarkup = this._generateMarkup();

    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDOM.querySelectorAll("*"));
    const curElements = Array.from(this._parentElement.querySelectorAll("*"));
    // console.log(curElements);
    // console.log(newElements);

    // Comparison between curElements and newElements
    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];
      // console.log(curEl, newEl.isEqualNode(curEl));

      // Updates changed text
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ""
      ) {
        // console.log("⚙️", newEl.firstChild.nodeValue.trim());
        curEl.textContent = newEl.textContent;
      }

      // update changed attrributes
      if (!newEl.isEqualNode(curEl))
        Array.from(newEl.attributes).forEach((attr) =>
          curEl.setAttribute(attr.name, attr.value)
        );
    });
  }

  // -----------------

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
