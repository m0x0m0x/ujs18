/*
For storing the bookmarks in a modal 
*/

import View from "./View.js";
import previewView from "./previewView.js";

class BookmarksView extends View {
  _parentElement = document.querySelector(".bookmarks__list");
  _errorMessage = "No Bookmark, add now fucker";
  _message = "";

  _generateMarkup() {
    return this._data
      .map((bookmark) => previewView.render(bookmark, false))
      .join("");
  }
}

export default new BookmarksView();
