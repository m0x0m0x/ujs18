/* 
Implementing the pagination view
*/

import View from "./View.js";

class AddRecipeView extends View {
  _parentElement = document.querySelector(".upload");

  _window = document.querySelector(".add-recipe-window");
  _overlay = document.querySelector(".overlay");
  _btnOpen = document.querySelector(".nav__btn--add-recipe");
  _btnClose = document.querySelector(".btn--close-modal");

  constructor() {
    super();
    this._addhandlerShowWindow();
    this._addHandlerHideWindow();
  }

  toggleWindow() {
    this._overlay.classList.toggle("hidden");
    this._window.classList.toggle("hidden");
  }

  _addhandlerShowWindow() {
    this._btnOpen.addEventListener("click", this.toggleWindow.bind(this));

    // K1 - This added for activatting keypress
    document.addEventListener("keydown", this._handleKeyPress.bind(this));
  }

  // K1 - Implementing the handler function for the key
  _handleKeyPress(event) {
    if (event.key === "a") {
      // Change "Enter" to the key you want to use
      this.toggleWindow();
    }
  }
  _addHandlerHideWindow() {
    this._btnClose.addEventListener("click", this.toggleWindow.bind(this));
    this._overlay.addEventListener("click", this.toggleWindow.bind(this));
  }

  _generateMarkup() {}
}
export default new AddRecipeView();
