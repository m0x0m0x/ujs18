/* 
Implementing the pagination view
*/

import View from "./View.js";

class PaginationVIew extends View {
  _parentElement = document.querySelector(".pagination");

  _generateMarkup() {
    // Compute number of pages
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    console.log(numPages);

    // Page 1 and there are other pages
    if (this._data.page === 1 && numPages > 1) {
      return "page1, others";
    }
    // On Last page
    if (this._data.page === numPages && numPages > 1) {
      return "lastPage";
    }
    // Other Page
    if (this._data.page < numPages) {
      return "otherpage";
    }
    // Page 1 and there are NO other pages
    return "only1Page";
  }
}
export default new PaginationVIew();
